
// This service communicates with Google Gemini AI to:
// 1. Generate Interview Reports
// 2. Generate ATS Friendly Resume HTML
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
// validate Gemini's response using the SAME schema before
// sending anything to MongoDB.

const interviewReportSchema = z.object({

    title: z
        .string()
        .describe("The title of the job for which the interview report is generated"),

    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe("Candidate match score between 0 and 100"),

    technicalQuestions: z.array(
        z.object({
            question: z.string().min(10),
            intention: z.string(),
            answer: z.string().min(30)
          }) 
        ),

    behavioralQuestions: z.array(
        z.object({
           question: z.string().min(10),
           intention: z.string(),
           answer: z.string().min(30)
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
});

const resumePdfSchema = z.object({
    html: z.string()
});

// Helper Function


function parseGeminiJson(text) {

    try {
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        return JSON.parse(cleaned);
    }
    catch (error) {
        console.error("Failed to parse Gemini JSON");
        throw new Error("Gemini returned invalid JSON.");
    }
}
// Helper Function
async function generateStructuredResponse({
    prompt,
    schema,
    model = "gemini-2.5-flash"
}) {

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // responseSchema: zodToJsonSchema(schema)
            }
        });
        const parsed = parseGeminiJson(response.text);
        // Validate BEFORE returning.
        console.log("========== PARSED JSON ==========");
        console.dir(parsed, { depth: null });
        console.log("================================");
        return schema.parse(parsed);

    }
    catch (error) {

    console.error(error);

    if (error instanceof z.ZodError) {

        console.log("Gemini returned:");

        console.dir(parsed, { depth: null });

    }

    throw error;

}
   
}
// Generate Interview Report
// Input
// Resume
// Self Description
// Job Description
// Output
// {
//      title,
//      matchScore,
//      technicalQuestions,
//      behavioralQuestions,
//      skillGaps,
//      preparationPlan
// }
async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    const prompt = `
You are an experienced Senior Technical Recruiter, Engineering Manager, Resume Reviewer, and Interview Coach.

Your task is to analyze the candidate's resume against the target job description and generate a complete interview preparation report.

===========================
CANDIDATE RESUME
===========================

${resume}

===========================
SELF DESCRIPTION
===========================

${selfDescription}

===========================
JOB DESCRIPTION
===========================

${jobDescription}

====================================================
IMPORTANT INSTRUCTIONS
====================================================

Return ONLY a valid JSON object.

DO NOT return Markdown.

DO NOT wrap the JSON inside another object.

DO NOT include explanations before or after the JSON.

DO NOT rename any field.

DO NOT add extra fields.

DO NOT omit any field.

Every field shown below is REQUIRED.

====================================================
THE RESPONSE MUST MATCH THIS EXACT STRUCTURE
====================================================

{
  "title": "Full Stack Developer",

  "matchScore": 90,

  "technicalQuestions": [
    {
      "question": "...",
      "intention": "...",
      "answer": "..."
    }
  ],

  "behavioralQuestions": [
    {
      "question": "...",
      "intention": "...",
      "answer": "..."
    }
  ],

  "skillGaps": [
    {
      "skill": "...",
      "severity": "low"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "...",
      "tasks": [
        "...",
        "...",
        "..."
      ]
    }
  ]
}

====================================================
VERY IMPORTANT RULES
====================================================

1.

"title"

Extract the actual job title from the Job Description.

Examples:

"Frontend Developer"

"MERN Stack Developer"

"Software Engineer"

Never leave it empty.

====================================================

2.

"matchScore"

Return a number between 0 and 100.

Do NOT return a string.

====================================================

3.

"technicalQuestions"

Generate EXACTLY 10 questions.

Each item MUST contain ONLY these properties:

{
    "question":"",
    "intention":"",
    "answer":""
}

The answer should be detailed enough to help the candidate prepare.

Do NOT return an array of strings.

====================================================

4.

"behavioralQuestions"

Generate EXACTLY 5 questions.

Each item MUST contain ONLY

{
    "question":"",
    "intention":"",
    "answer":""
}

The answer should use the STAR interview technique.

However,

DO NOT create fields such as

"star_answer"

"interviewer_intention"

"reason"

"description"

"explanation"

The STAR response MUST be stored inside the "answer" field.

====================================================

5.

"skillGaps"

Generate between 5 and 8 genuine missing skills.

Compare the Resume against the Job Description.

Each item MUST contain ONLY

{
    "skill":"",
    "severity":"low"
}

Severity must ONLY be one of

"low"

"medium"

"high"

Do NOT include any additional properties such as

"rationale"

"reason"

"description"

====================================================

6.

"preparationPlan"

Generate a preparationPlan ARRAY.

NOT an object.

Correct:

"preparationPlan":[
{
"day":1,
"focus":"React",
"tasks":[
"...",
"...",
"..."
]
}
]

Incorrect:

{
"day1":{...},
"day2":{...},
"day3":{...}
}

Generate EXACTLY 7 objects.

Each object represents one day.

Each object MUST contain

{
    "day":1,
    "focus":"",
    "tasks":[
        "...",
        "...",
        "..."
    ]
}

Generate between 3 and 5 tasks for each day.

====================================================

FINAL CHECK BEFORE RETURNING

✔ Return ONLY valid JSON.

✔ All property names must exactly match the schema.

✔ Do NOT invent new property names.

✔ Do NOT rename properties.

✔ Do NOT change arrays into objects.

✔ Do NOT change objects into arrays.

✔ Every array must contain OBJECTS, never strings.

✔ Every required field must be present.

`;

    return await generateStructuredResponse({
        prompt,
        schema: interviewReportSchema
    });
}
// Convert HTML to PDF
async function generatePdfFromHtml(htmlContent) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        await browser.close();
        return pdfBuffer;
    }
    catch (error) {
        console.error("PDF Generation Error");
        console.error(error);
        throw new Error("Failed to generate resume PDF.");
    }

}



// Generate ATS Resume
// Input
// Resume
// Self Description
// Job Description
// Output
// HTML
// Controllers convert this HTML into PDF.


async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `

You are a professional Resume Writer,
Senior Software Engineering Recruiter
and ATS Optimization Expert.



Candidate Resume

${resume}



Candidate Self Description

${selfDescription}


Target Job Description

${jobDescription}



Your task is to rewrite the resume.

IMPORTANT RULES

Return ONLY JSON.

Do NOT return markdown.

Return exactly

{

"html":"..."

}



Resume Requirements

1.

Professional.

2.

One Page.

3.

ATS Friendly.

4.

No Tables.

5.

No Icons.

6.

No Images.

7.

Use semantic HTML.

8.

Inline CSS only.

9.

Modern typography.

10.

Highlight achievements.

11.

Quantify projects wherever possible.

12.

Improve wording.

13.

Do NOT sound AI generated.

14.

Optimize using keywords from the Job Description.

15.

Emphasize technical skills relevant to the role.

16.

Maintain professional spacing.

17.

Keep printable on A4.

18.

Use proper headings

Summary

Skills

Projects

Education

Achievements (if applicable)

Return ONLY

{

"html":"..."

}

`;

    const jsonContent = await generateStructuredResponse({
        prompt,
        schema: resumePdfSchema
    });
    if (!jsonContent.html) {
        throw new Error("Gemini did not generate resume HTML.");
    }
    return await generatePdfFromHtml(
        jsonContent.html
    );
}
export {

    generateInterviewReport,

    generateResumePdf

};