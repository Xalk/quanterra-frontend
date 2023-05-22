import React, {useState, useMemo} from "react";
import {
    Box,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    ListSubheader,
    TextField,
    InputAdornment, Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {ICrewMember} from "@/types/crew-member.interface";
import avatarImg from "@/assets/profile.svg";
import Image from "next/image";

const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;


interface SelectExistingCrewProps {
    crewMembers?: ICrewMember[]
    selectedCrewMemberId: string | number
    setSelectedCrewMemberId: (id: string | number) => void
}

export default function SelectExistingCrew({
                                               crewMembers,
                                               selectedCrewMemberId,
                                               setSelectedCrewMemberId
                                           }: SelectExistingCrewProps) {

    const [searchText, setSearchText] = useState("");
    const displayedOptions = useMemo(
        () => crewMembers?.filter((member) => containsText(`${member.user.firstName} ${member.user.lastName}`, searchText)),
        [searchText]
    );

    return (
        <FormControl fullWidth>
            <InputLabel id="search-select-label">Options</InputLabel>
            <Select
                MenuProps={{autoFocus: false}}
                labelId="search-select-label"
                id="search-select"
                value={selectedCrewMemberId}
                label="Options"
                onChange={(e) => setSelectedCrewMemberId(e.target.value)}
                onClose={() => setSearchText("")}
                renderValue={() => {
                    const crew = crewMembers?.find((member) => member.id === selectedCrewMemberId)?.user

                    return <Box sx={{display: 'flex'}}>
                        <Image src={avatarImg} alt={'avatar img'} width={24}/>
                        <Typography ml={1}>{crew?.firstName}&nbsp;{crew?.lastName}</Typography>
                    </Box>
                }}
            >
                <ListSubheader>
                    <TextField
                        size="small"
                        autoFocus
                        placeholder="Type to search..."
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                                e.stopPropagation();
                            }
                        }}
                    />
                </ListSubheader>
                {displayedOptions?.map((member, i) => (
                    <MenuItem key={member.id} value={member.id}>
                        <Image src={avatarImg} alt={'avatar img'} width={24}/>
                        <Typography ml={1}>{member.user.firstName}&nbsp;{member.user.lastName}</Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
