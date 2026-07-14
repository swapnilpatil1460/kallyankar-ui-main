import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const SelectStatuRadio: React.FC<{
  setStatus: (val: string) => void;
  status: string;
}> = ({ setStatus, status }) => {
  return (
    <div className="w-full">
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
        <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
      </RadioGroup>
    </div>
  );
};

export default SelectStatuRadio;
