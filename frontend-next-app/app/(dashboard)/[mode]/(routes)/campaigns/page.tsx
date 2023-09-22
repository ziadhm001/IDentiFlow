import { Button } from "@/components/ui/button";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns"
import { Plus } from "lucide-react";
import axios from "axios";

async function getData({params} : { params: Params}): Promise<any[]> {
    const campaings = await axios.get(`http://localhost:5001/api/campaign`)
    const campaingsReturn = campaings.data.data.map((campaign: { mode: any; }) =>{
        campaign.mode = params.mode
        return campaign
    })
    return campaingsReturn
  }

const CampaignsPage = async (params : {params : Params}) => {
    const data = await getData(params)
    const { mode } = params.params
    return ( 
        <div className="p-6">
            <DataTable mode={mode} columns={columns} data={data} />
        </div>
     );
}
 
export default CampaignsPage;