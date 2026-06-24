import {GoogleGenAi} from '@google-ai/generative';
import {z} from 'zod';
import puppeteer from 'puppeteer';


const ai= new GoogleGenAi({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,

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