import { Button } from "@/components/ui/button";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

const CampaignsPage = ({params} : {params : Params}) => {
    return ( 
        <div className="p-6">
            <Link href={`/${params.mode}/campaigns/create`}>
                <Button>
                    New Campaign
                </Button>
            </Link>
        </div>
     );
}
 
export default CampaignsPage;