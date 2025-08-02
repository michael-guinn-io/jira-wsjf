import React, {useState} from 'react';
import {Button, Popup} from "@forge/react";
import FilterMenu from "./FilterMenu";

const FilterControl = () => {

    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    return (
        <>
            <Popup isOpen={filterMenuOpen} placement="bottom-start"
              content={() => <FilterMenu />}
              trigger={() => (
                  <Button appearance="subtle" iconBefore="filter" isSelected={filterMenuOpen} onClick={() => setFilterMenuOpen(!filterMenuOpen)}>Filter</Button>
              )}
            />
        </>
    )
}

export default FilterControl;
