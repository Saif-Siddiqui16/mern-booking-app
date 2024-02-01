type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b-2 border-slate-500 pb-4">
      <h2 className="font-semibold">Star Ratings :</h2>

      <div className="ml-4 mt-3">
        {["5", "4", "3", "2", "1"].map((star) => {
          return (
            <label className="flex mt-1">
              <input
                type="checkbox"
                value={star}
                checked={selectedStars.includes(star)}
                onChange={onChange}
              />
              <span className="ml-2">{star} Stars</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StarRatingFilter;
