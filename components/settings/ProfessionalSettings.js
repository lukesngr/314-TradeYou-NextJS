
function ProfessionalSettings() {
    return (
    <>
    <FormControl>
        <FormLabel>Payment Type</FormLabel>
        <RadioGroup defaultValue="Membership" name="paymentType">
            <FormControlLabel value="Membership" control={<Radio />} label="Membership - annual fee of $300 for no joining fee"></FormControlLabel>
            <FormControlLabel value="Commission" control={<Radio />} label="Commission fee - commission fee of $25 off every job"></FormControlLabel>
        </RadioGroup>
    </FormControl>
    <Button variant="contained">Update</Button>
    </>
    )
}

export default ProfessionalSettings;