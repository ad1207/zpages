import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";
import mail from "@sendgrid/mail";
mail.setApiKey(process.env.NEXT_PUBLIC_SG_SECRET_KEY);

export const createSubscription = async (body) => {
    var resp = null;
    try {
        const { email, company_id, repo_id, lead_id } = body;
        let date = new Date();
        const result = await prisma.lead_funnels.create({
            data: {
                email: email,
                company_id: BigInt(company_id),
                repo_id: 5,
                lead_id: lead_id,
                created_date: date
            }
        })
        resp = bigIntToString(result);
        await sendMail(email);
    } catch (error) {
        console.log("createSubscription error :: ", error.name)
    }
    return resp;
}

export const getByLeadId = async (leadId) => {
    var resp = null;
    try {
        const result = await prisma.lead_funnels.findMany({
            where: {
                lead_id: BigInt(leadId)
            }
        })
        resp = bigIntToString(result);
    } catch (error) {
        console.log("getByLeadId error :: ", error)
    }
    return resp;
}


export const checkDuplicateEmail = async (email, leadId) => {
    const result = await prisma.lead_funnels.count({
        where: {
            email: email,
            lead_id: BigInt(leadId),
        },
    });
    console.log("check result data ---->", result)
    return result;
};


export const sendMail = async (email) => {
    try {
        const msg = {
            to: email,
            from: 'sender@squapl.com',
            subject: 'Subscription Test',
            text: 'Test',
            html: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><p><span><strong>Hi Sir,</strong></span><br><br>
            Click the link to signup<br><br>
            <br><br>
            <span><strong>Thanks,</strong></span></p></body></html>`,
        };
        const data = await mail.send(msg).then(() => {
            return { status: 'Ok' };
        });
        return data;

    } catch (error) {
        console.log("error occurred in sendgrid ", error)
    }
};