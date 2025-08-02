import React, {useEffect, useState} from 'react';
import {requestJira} from "@forge/bridge";
import {Box, Tab, TabList, Tabs, useProductContext} from "@forge/react";
import WSJFControls from "../WSJFControls/WSJFControls";
import IssueColumn from "../IssueColumn/IssueColumn";

const WSJFWorkspace = async () => {

    const productContext = useProductContext();
    const [filters, setFilters] = useState([]);
    const [issues, setIssues] = useState({});

    useEffect(() => {
        (async () => {
            const issuesResponse = await requestJira(`/rest/api/2/search/jql`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({jql: `project = ${productContext.project.id}`})
            });

            setIssues(await issuesResponse.json());
            console.log(issues);
        })();
    }, [filters]);

    return (
        <Box>
            <WSJFControls/>
            <IssueColumn/>
            <Tabs>
                <TabList>
                    <Tab label="Business Value">
                        Business Value
                    </Tab>
                    <Tab label="Time Criticality">
                        Time Criticality
                    </Tab>
                    <Tab label="Opportunity Enablement/Risk Reduction">
                        Opportunity Enablement/Risk Reduction
                    </Tab>
                    <Tab label="Job Size">
                        Job Size
                    </Tab>
                </TabList>
            </Tabs>
        </Box>
    )
}

export default WSJFWorkspace;