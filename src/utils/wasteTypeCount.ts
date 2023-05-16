import {IStorageTank} from "@/types/storage-tank.interface";

export const wasteTypeCount = (storageTanks?: IStorageTank[]): {type: string, count: number}[] => {

    // Create an object to store waste types and their counts
    const wasteTypeCount = {} as {[key: string]: number};

// Iterate over the storage tanks and collection records
    storageTanks?.forEach((storageTank) => {
        const wasteType = storageTank.waste.type.toLowerCase();

        if (wasteTypeCount[wasteType]) {
            wasteTypeCount[wasteType]++;
        } else {
            wasteTypeCount[wasteType] = 1;
        }
    });


// Convert the waste type count object into an array of objects
    const wasteTypeCountArray = Object.entries(wasteTypeCount).map(([type, count]) => ({ type, count }));

    return wasteTypeCountArray
}
