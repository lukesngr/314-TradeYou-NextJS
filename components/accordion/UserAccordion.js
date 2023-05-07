import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Chip, Button} from '@mui/material';

function UserAccordion(props) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: "primary.main" }}>
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{display: 'flex', justifyContent: 'space-between', width: 'min-content', backgroundColor: "primary.main" }}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', alignContent: 'flex-start', mr: '4em'}}>
                    <Typography variant='body2'>{props.description}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
                    <Chip label={props.category} variant="outlined" />
                    <Chip label={props.price} icon={<AttachMoneyIcon />} />
                </Box>
                
            </AccordionDetails>
        </Accordion>
    )
}

export default UserAccordion;