import React, {FC} from "react";
import {Label} from "../models/Label";
import {Box, Backdrop} from "@deity/falcon-ui";
import {useDataHook} from "model-react";
import {application} from "../models/application";

const LabelChoice: FC<{labelModel: Label; onClick: () => void}> = ({
    labelModel,
    onClick,
}) => {
    const [h] = useDataHook();
    return (
        <Box mb="xs" css={{cursor: "pointer"}} onClick={onClick}>
            {labelModel.getText(h)}
        </Box>
    );
};

export const LabelSelectorComp: FC = () => {
    const [h] = useDataHook();
    const labels = application.getLabels(h);

    return (
        <>
            <Box
                boxShadow="strong"
                flexDirection="column"
                bg="white"
                p="sm"
                border="regular"
                borderRadius="medium"
                display="inline-block"
                css={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,
                }}>
                {labels.length ? (
                    <>
                        <Box mb="md">Select one of the available labels:</Box>
                        {labels.map(label => (
                            <LabelChoice
                                key={label.ID}
                                labelModel={label}
                                onClick={() => application.addLabelToPicture(label)}
                            />
                        ))}
                    </>
                ) : (
                    <Box>
                        No labels are present yet, please create a label on the left
                    </Box>
                )}
            </Box>
            <Backdrop visible onClick={() => application.setLabelTarget(null)}></Backdrop>
        </>
    );
};
