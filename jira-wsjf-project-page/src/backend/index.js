import api, {route, getAppContext} from '@forge/api';

const calculateWSJFForIssues = async ({issues}) => {

    return await Promise.all(issues.map(async issue => {

        const {appAri: {appId}, environmentType} = getAppContext();

        // from manifest, IDs will be different per installed project so must use keys
        const businessValueKey = `${appId}__${environmentType}__jira-wsjf-business-value-field`,
            timeCriticalityKey = `${appId}__${environmentType}__jira-wsjf-time-criticality-field`,
            opportunityEnablementRiskReductionKey = `${appId}__${environmentType}__jira-wsjf-opportunity-enablement-risk-reduction-field`,
            jobSizeKey = `${appId}__${environmentType}__jira-wsjf-job-size-field`;

        const queryParams = new URLSearchParams();
        queryParams.append('fieldsByKeys', 'true');
        [businessValueKey, timeCriticalityKey, opportunityEnablementRiskReductionKey, jobSizeKey].forEach(key => queryParams.append('fields', key));

        const getIssueUrl = route`/rest/api/3/issue/${issue.id}?${queryParams}`;

        const result = await api
            .asApp()
            .requestJira(getIssueUrl, {
                headers: {
                    'Accept': 'application/json'
                }
            });
        const issueData = await result.json();

        return calculateWSJF(issueData.fields[businessValueKey], issueData.fields[timeCriticalityKey], issueData.fields[opportunityEnablementRiskReductionKey], issueData.fields[jobSizeKey]);
    }));
}

function calculateWSJF(businessValue, timeCriticality, opporunityEnablementRiskReduction, jobSize) {
    return +((businessValue + timeCriticality + opporunityEnablementRiskReduction) / jobSize).toFixed(2);
}

export const handleCalculateWSJFView = calculateWSJFForIssues;