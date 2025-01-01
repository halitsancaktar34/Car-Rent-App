import { useSearchParams } from "react-router-dom";
import CustomButton from "../CustomButton";

const ShowMore: React.FC = () => {
  const [params, setParams] = useSearchParams();

  const limit = Number(params.get("limit")) || 5;

  const handleLimit = (): void => {
    const newLimit = String(limit + 5);

    // Param değişkenini güncelle
    params.set("limit", newLimit);
    // URL'i güncelle
    setParams(params);
  };

  return (
    <div className="w-full flex-center gap-5 my-10">
      {limit < 30 && (
        <CustomButton handleClick={handleLimit} title="Daha Fazla" />
      )}
    </div>
  );
};

export default ShowMore;
