import axios from "axios";
import { CopyIcon, GitBranchPlus, LayoutDashboard } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { TargetForm } from "./_components/target-form";
import { DiscountForm } from "./_components/discount-form";
import { Banner } from "@/components/banner";
import { CampaignActions } from "./_components/campaign-actions";
import { Button } from "@/components/ui/button";
import { SyntaxHighlighteEdited } from "../_components/syntax-highlighter";

async function getData(campaignBrand: string, campaignId: string): Promise<{ campaignId: string, campaignName: string, campaignBrand: string, campaignTarget: string[], campaignDiscountValue: number, isDiscountPercentage: boolean, isActive: boolean }> {
    const response = await axios.get(`http://localhost:5001/api/campaign/${campaignBrand}/${campaignId}`)
    const campaign = response.data
    return campaign.data
}
const CampaignIdPage = async ({ params }: { params: { campaignId: string, campaignBrand: string } }) => {
    const code = `
    <script>
    const container = document.getElementById('form-container');
    const form = document.createElement('form');
    form.style.cssText = 'max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;';

    const createInput = (type, name, placeholder) => {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.style.cssText = 'padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px; transition: border-color 0.3s ease-in-out;' + (type === 'number' ? 'text-align: center; font-size: 20px;' : '');
        if (type === 'number') {
            input.setAttribute('inputmode', 'numeric');
            input.style.appearance = 'textfield';
            input.addEventListener('input', function () {
                if (this.value.length > 1) {
                    this.value = this.value.slice(0, 1);
                }
            });
        }
        return input;
    };

    const firstNameInput = createInput('text', 'firstName', 'First Name');
    const lastNameInput = createInput('text', 'lastName', 'Last Name');
    const emailInput = createInput('email', 'email', 'Email');

    const otpContainer = document.createElement('div');
    otpContainer.style.display = 'none';
    otpContainer.style.justifyContent = 'center';
    const otpInputs = [];

    for (let i = 0; i < 6; i++) {
        const otpInput = createInput('number', 'otp' + i, '');
        otpInput.style.width = '40px';
        otpInput.style.marginRight = '5px';
        otpInput.style.appearance = 'textfield';
        otpInputs.push(otpInput);
        otpContainer.appendChild(otpInput);
    }

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.style.cssText = 'background-color: #007bff; color: #fff; cursor: pointer; padding: 10px; transition: background-color 0.3s ease-in-out;';

    const messageElement = document.createElement('p');
    messageElement.style.cssText = 'margin-top: 10px; font-weight: bold; text-align: center; transition: opacity 0.3s ease-in-out; color: red;';

    form.appendChild(firstNameInput);
    form.appendChild(lastNameInput);
    form.appendChild(emailInput);
    form.appendChild(otpContainer);
    form.appendChild(submitButton);
    form.appendChild(messageElement);

    container.appendChild(form);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.classList.add('loading');
        const formData = new FormData(form);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        fetch('https://your-api-endpoint.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            form.classList.remove('loading');
            if (data.isPersonalEmail) {
                messageElement.textContent = 'Sorry, you are not eligible for offers.';
            } else {
                firstNameInput.disabled = true;
                lastNameInput.disabled = true;
                emailInput.disabled = true;
                otpContainer.style.display = 'flex';
                submitButton.textContent = 'Verify OTP';
                form.addEventListener('submit', function (otpEvent) {
                    otpEvent.preventDefault();
                    const otpValues = otpInputs.map(input => input.value).join('');
                    fetch('https://your-otp-verification-endpoint.com/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ otp: otpValues }),
                    })
                    .then(otpResponse => otpResponse.json())
                    .then(otpData => {
                        if (otpData.isVerified) {
                            messageElement.textContent = 'Success! You are registered and eligible for offers.';
                        } else {
                            messageElement.textContent = 'OTP verification failed. Please re-enter OTP.';
                        }
                    })
                    .catch(otpError => {
                        messageElement.textContent = 'An error occurred while verifying OTP.';
                        console.error('OTP Verification Error:', otpError);
                    });
                });
            }
        })
        .catch(error => {
            form.classList.remove('loading');
            messageElement.textContent = 'An error occurred while processing your request.';
            console.error('Error:', error);
        });
    });
    </script>
    `
    const { campaignId, campaignBrand } = params
    const campaign = await getData(campaignBrand, campaignId)
    const requiredFields = [
        campaign.campaignName,
        campaign.campaignTarget,
        campaign.campaignDiscountValue
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).filter(item => Array.isArray(item) ? item.length === 0 ? false : true : true).length
    const completedText = `${completedFields}/${totalFields}`
    const isCompleted = completedFields === totalFields
    return (
        <>
            {
                !campaign.isActive &&
                <Banner
                    variant="warning"
                    label="This campaign is not currently active, which means users won't be able to use it."
                />
            }
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Campaign Setup
                        </h1>
                        <span className="text-sm text-slate-700">
                            Complete all fields ({completedText})
                        </span>
                    </div>
                    <CampaignActions
                        disabled={!isCompleted}
                        initialData={campaign}
                        campaignBrand={campaignBrand}
                    />
                </div>
                <div className="grid grid-cols-1 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">
                                Customize your campaign
                            </h2>
                        </div>
                        <TitleForm
                            initialData={campaign}
                        />
                        <TargetForm
                            initialData={campaign}
                        />
                        <DiscountForm
                            initialData={campaign}
                        />
                        <div className="flex flex-col mt-12 space-y-2">
                            <div className="flex items-center gap-x-2 mb-4">
                                <IconBadge icon={GitBranchPlus} />
                                <h2 className="text-xl">
                                    Embed into your app
                                </h2>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-lg">- Copy the following</p>
                                <code className="mx-2 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold max-w-max">
                                    {"<div>"}
                                </code>
                                <p className="text-lg">Container into the spot you want to place form in your application</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="bg-slate-100 rounded-md p-4 border max-h-max mb-4">
                                    <div className='font-medium flex items-center justify-between'>
                                        <h1 className='font-bold'>#1</h1>
                                        <Button variant="ghost">
                                            <CopyIcon className='h-4 w-4 mr-2 ' />
                                            <span>Copy to clipboard</span>
                                        </Button>
                                    </div>
                                    <SyntaxHighlighteEdited code='<div id="form-container"></div>'/>
                                </div>
                                <div className="flex flex-row">
                                    <p className="text-lg">- Copy the following</p>
                                    <code className="mx-2 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold max-w-max">
                                        {"<script>"}
                                    </code>
                                    <p className="text-lg">tag just after the</p>
                                    <code className="mx-2 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold max-w-max">
                                        {"<body>"}
                                    </code>
                                    <p className="text-lg">tag</p>
                                </div>
                                <div className="bg-slate-100 rounded-md p-4 border h-48">
                                    <div className='font-medium flex items-center justify-between'>
                                        <h1 className='font-bold'>#2</h1>
                                        <Button variant="ghost">
                                            <CopyIcon className='h-4 w-4 mr-2 ' />
                                            <span>Copy to clipboard</span>
                                        </Button>
                                    </div>
                                    <SyntaxHighlighteEdited code={code}/>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>
    );
}

export default CampaignIdPage;