import {GoogleGenAi} from '@google-ai/generative';
import {z} from 'zod';
import puppeteer from 'puppeteer';


const ai= new GoogleGenAi({
    apiKey: process.env.GEMINI_API_KEY,

});

const interviewReportSchema = z.object({
    matchScore: z.number().describe(
        "A score between 0 and 100 indicating how well the candidate's resume matches the job description."
    ),

    technicalQuestions: z.array(
        z.object({
            questiion: z.string().describe(
                " The technical question that can be asked in the interview "),
            intention: z.string().describe(
                "The intention of interviewer behind asking this question "
            ),
            answer: z.string().describe(
                "How to answer this question, including key points to cover and common pitfalls to avoid and what approach to take when answering the question etc."
            )
        })
    ),

    behaviouralQuestions: z.array(
        z.object({
      question: z.string().describe(
        "The behavioural question that can be asked in the interview"
      ),
      intention: z.string().describe(
        "The intention of interviewer behind asking this question"
      ),
      answer: z.string().describe(
        "How to answer this question, including key points to cover and common pitfalls to avoid and what approach to take when answering the question etc."
            
      ),
    })
    ) ,
      skillGaps: z.array(
    z.object({
      skill: z.string().describe(
        "The skill which the candidate is lacking based on the resume and job description comparison"
      ),
      severity: z.enum(["low", "medium", "high"]).describe(
        "The severity of this skill gap"
      ),
    })
  ),
   preparationPlan: z.array(
    z.object({
      day: z.number().describe(
        "The  number of days required for the preparation plan"
      ),
      focus: z.string().describe(
        "what is main  task or main skill to fucus on this day of the preparation plan"
      ),
      tasks: z.array(z.string()).describe(
        "list of all the tasks to be done on this day of the preparation plan"
      ),
    })
  ),
     title: z.string().describe(
    "The title of the job for which the interview report is generated"
  ),

});




export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}





async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

export async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  const resumePdfSchema = z.object({
    html: z.string().describe(
      "HTML content that can be converted into PDF"
    ),
  });

  const prompt = `
Generate resume for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  return await generatePdfFromHtml(jsonContent.html);
}