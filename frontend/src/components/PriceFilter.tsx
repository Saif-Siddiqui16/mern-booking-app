type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};
const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="border-b-2 border-slate-500 pb-4">
      <h2 className="font-semibold">Star Ratings :</h2>
      <div className="mt-2 ml-4">
        <select
          className="w-32"
          value={selectedPrice}
          onChange={(event) =>
            onChange(
              event.target.value ? parseInt(event.target.value) : undefined
            )
          }
        >
          {["1000", "2000", "3000", "4000"].map((price) => {
            return <option value={price}>{price}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default PriceFilter;
