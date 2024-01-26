import { Card, CardBody, Typography, Dialog } from "@material-tailwind/react";
import React from "react";
import AddFab from "./add-fab";
import { ServerForm } from "./server-form";

export function ServerDialog() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen((cur) => !cur);
    };

    return (
      <>
        <AddFab onClick={handleOpen}></AddFab>

        <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none" placeholder={undefined}>

            <Card className="mx-auto w-full max-w-[24rem]" placeholder={undefined}>
                <CardBody className="flex flex-col gap-4" placeholder={undefined}>
                    <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                        Create Server
                    </Typography>
                    
                    <ServerForm onClose={handleOpen}></ServerForm>
                </CardBody>
            </Card>
        </Dialog>
      </>
    );
  }