import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import StorageTanks from "@/components/screens/storage-tanks";
import CollectionRecords from "@/components/screens/collection-records";

const CollectionRecordsPage = () => {
    return (
        <Dashboard>
            <CollectionRecords/>
        </Dashboard>
    );
};

export default CollectionRecordsPage;
