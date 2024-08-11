import {Button} from "@/components/ui/button";

const AddEditFormButton = ({actionType}: {actionType: 'add'  | 'edit'}) => {

    return (
        <Button
            variant={'default'}
            type={'submit'}
            className={'mt-5 ml-auto'}
        >
            { actionType === 'add' ? 'Add luggage' : 'Edit luggage'}
        </Button>
    );
};

export default AddEditFormButton;