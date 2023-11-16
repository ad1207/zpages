import { getLeadPageByNano } from "../../../../service/lead-page.service";
import Builder from '../../../../components/Builder'

export default async function Page({params}){
    const cTempNano = params.lead_page_id
    const leadData = await getLeadPageByNano(cTempNano)
    return <Builder leadData={leadData.blocks} mode={'view'} />
}