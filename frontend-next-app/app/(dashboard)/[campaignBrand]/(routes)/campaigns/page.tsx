import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns"
import axios from "axios";

async function getData(campaignBrand : string): Promise<any[]> {
    try{
        const campaings = await axios.get(`http://localhost:5001/api/campaign/${campaignBrand}`);
        const campaingsReturn = campaings.data.data;
        return campaingsReturn;
    }catch{
        return []
    }
  }

const CampaignsPage = async ({params} : {params: {campaignBrand: string}}) => {
    const { campaignBrand } = params
    const data = await getData(campaignBrand)
    return ( 
        <div className="p-6">
            <DataTable campaignBrand={campaignBrand} columns={columns} data={data} />
        </div>
     );
}
 
export default CampaignsPage;