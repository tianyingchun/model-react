import React, {FC} from "react";
import {PictureSearch} from "./PictureSearchComp";
import {MainPictureComp} from "./MainPictureComp";
import {PictureListComp} from "./PictureListComp";
import {LabelSelectorComp} from "./LabelSelectorComp";
import {Box, FlexLayout} from "@deity/falcon-ui";
import {LeftSidebarComp} from "./LeftSidebarComp";
import {useDataHook} from "model-react";
import {application} from "../models/application";

export const ApplicationComp: FC = () => {
    const [h] = useDataHook();
    return (
        <Box css={{height: "100%"}}>
            {application.isPictureSearchOpened(h) && <PictureSearch />}
            {application.isLabeling(h) && <LabelSelectorComp />}
            <FlexLayout css={{height: "100%"}}>
                <Box css={{width: 300}}>
                    <LeftSidebarComp />
                </Box>
                <Box flex={1}>
                    <MainPictureComp />
                </Box>
                <Box css={{width: 500}}>
                    <PictureListComp />
                </Box>
            </FlexLayout>
        </Box>
    );
};
