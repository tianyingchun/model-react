import React, {FC} from "react";
import {application} from "../models/application";
import {useDataHook} from "model-react";
import {Box, FlexLayout} from "@deity/falcon-ui";

const Img: FC<{src: string; onClick?: () => void}> = ({src, onClick}) => (
    <Box
        onClick={onClick}
        flex={1}
        bg="black"
        css={{
            width: "100%",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${src})`,
        }}
    />
);

export const MainPictureComp: FC = () => {
    const [h] = useDataHook();
    const selectedPicture = application.getSelectedPicture(h);
    return (
        <Box
            css={{width: "100%", height: "100%"}}
            borderLeft="regular"
            bg="secondary"
            borderRight="regular">
            {selectedPicture ? (
                <FlexLayout flexDirection="column" css={{height: "100%"}}>
                    <Box p="md">{selectedPicture.getTitle(h)}</Box>
                    <Img src={selectedPicture.getPicture(h)} />
                </FlexLayout>
            ) : (
                <Box p="lg">Please select a picture on the right</Box>
            )}
        </Box>
    );
};
