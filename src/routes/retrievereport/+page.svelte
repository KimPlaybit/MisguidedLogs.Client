<script lang="ts">
	import Header from '$lib/header/header.svelte';
	import SubHeaderButtons from '$lib/header/subHeaderButtons.svelte';
	import { PageContent } from '$lib/misc/pageContent';
	import ReportSender from '$lib/repository/reportSender';

    let code = $state("");
    let sending = $state(false);

    const onClick = () => {
        if (sending) {
            return;
        }
        if(code && code.length > 0) {
            // Redirect to the report page with the provided code
            sending = true;
            ReportSender.PutReport(code)
                .then(result => {
                    if (result) {
                        alert("Report has been sent successfully! It may take a few minutes to process.");
                    } else {
                        alert("Report not found or could not be processed. Please check the report code and try again.");
                    }
                })
                .catch(error => {
                    console.error('Error sending report:', error);
                    alert("An error occurred while sending the report. Please try again later.");
                })
                .finally(() => {
                    sending = false;
                });
        } else {
            alert("Please enter a valid report code.");
        }
    };
</script>

<div>
    <title>Retrieve Report - Misguided Logs</title>
    <meta name="Retrieve a report from Warcraftlogs" />
    <Header searchCallback={() => {}}></Header>
    <div class="subheader"><SubHeaderButtons page={PageContent.RetrieveReport}></SubHeaderButtons></div>
    <div class="page-content" style="margin-top: 20px;">
        <h3>Report Retrieval</h3>
        <div>In order for Misguidedlogs to reward a raid for its achievements at the moment, please provide the code of the report. it 
            can be found in the URL of the report. For example, in the URL <p></p><span style="font-weight:bold">https://fresh.warcraftlogs.com/reports/pK9MJWy6dmfgvt2xHQ</span>, 
            the code is <span style="font-weight:bold">pK9MJWy6dmfgvt2xHQ</span>.
            <p></p>
            Only Classic Anniversary raids are supported.
        </div>
        <input id="reportCodeInput" placeholder="Write The Report Code" type="text" bind:value={code} disabled={sending}/>
        <button disabled={sending} onclick={onClick}>Retrieve Report</button>
        {#if sending}
            <p>Verifing report from warcraftlogs... please wait</p>
        {/if}
    </div>
</div>

<style>
    .page-content {
        display: flex;
        flex-direction: column;
        align-items: left;
        text-align: left;
        justify-content: center;
        margin-top: 20px;
    }

    input {
        margin-top: 10px;
        padding: 10px;
        font-size: 16px;
        border-radius: 4px;
        width: 300px;
    }

    input:focus {
        outline: none;
    }

    button {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 16px;
        color: #060403;
        background-color: #f0ae30;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width :150px;
    }
    button:disabled {
        background-color: grey;
        cursor: not-allowed;
    }
  
    @media(max-width: 600px) {
        .page-content {
            margin-left: 10px;
            margin-right: 10px;
        }
        .subheader {
            display: none;
        }
    }
    @media(max-width: 370px) {
        input {
            width: 90%;
        }
    }
</style>