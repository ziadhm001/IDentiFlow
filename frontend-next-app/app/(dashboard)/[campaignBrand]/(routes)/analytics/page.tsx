import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns"
import axios from "axios";
import { Chart } from "./_components/chart";
import { DataCard } from "./_components/data-card";

async function getData({params} : { params: Params}): Promise<any[]> {
    try{
        const customers = await axios.get(`http://localhost:5002/api/customer`)
        const customersReturn = customers.data.data.map((campaign: { mode: any; }) => {
            campaign.mode = params.mode
            return campaign
        })
        return customersReturn
    }catch{
        return []
    }
}

async function getAnalytics(): Promise<any[]> {
    try{
        const analytics = await axios.get(`http://localhost:5002/api/customer/analytics`)
        return analytics.data.data
    }catch{
        return []
    }
}

const AnalyticsPage = async (params : {params : Params}) => {
    const data = await getData(params)
    const analytics = await getAnalytics()
    const total = analytics.find((analyitc) => analyitc._id === "Total")
    analytics.pop()
    const { mode } = params.params
    return ( 
        <div className="p-6">
            <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DataCard
            label="Total Verified Customers"
            value={total.count}
            shouldFormat
            />
        </div>
            <Chart
                data={analytics}
            />
        </div>
            <DataTable mode={mode} columns={columns} data={data} />
        </div>
     );
}
 
export default AnalyticsPage;