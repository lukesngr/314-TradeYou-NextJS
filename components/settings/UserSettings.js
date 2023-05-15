function UserSettings() {
    return (
    <>
        <FormControl>
            <FormLabel>Payment Type</FormLabel>
            <RadioGroup defaultValue="Membership" name="paymentType">
                <FormControlLabel value="Membership" control={<Radio />} label="Membership - annual fee of $2000 for unlimited callouts"></FormControlLabel>
                <FormControlLabel value="Commission" control={<Radio />} label="Pay-on-demand - pay $100 per service use"></FormControlLabel>
            </RadioGroup>
        </FormControl>
        <Button variant="contained">Update</Button>
    </>
    )
}

export default UserSettings;