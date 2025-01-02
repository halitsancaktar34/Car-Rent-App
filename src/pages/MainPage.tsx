import { useEffect, useState } from "react";
import CustomFilter from "../components/CustomFilter";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { fetchCars } from "../utils/fetchCars";
import { CarType } from "../types";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import ShowMore from "../components/ShowMore";
import { fuels, years } from "../costants";

const MainPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [cars, setCars] = useState<CarType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const paramsObj = Object.fromEntries(params.entries());

    fetchCars(paramsObj)
      .then((data: CarType[]) => {
        const limit = Number(params.get("limit")) || 5;

        // Gelen arabaları mevcut listeye ekle
        setCars((prevCars) => {
          if (prevCars.length >= limit) {
            return [...data]; 
          }
          return [...prevCars, ...data];
        });
      })
      .catch(() => setIsError(true));
  }, [params]);

  return (
    <div>
      <Hero />
      <div id="catalogue" className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>
          <p>Beğenebileceğin Arabaları Keşfet</p>
        </div>
        {/* Filtreleme Alanı */}
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="Üretim Yılı" options={years} />
            <CustomFilter title="Yakıt Tipi" options={fuels} />
          </div>
        </div>
        {/* Araba Listeleme Alanı */}

        {!cars.length ? (
          <div className="home__error-container">
            <h2>Yükleniyor...</h2>
          </div>
        ) : isError ? (
          <div className="home__error-container">
            <h2>Üzgünüz, verileri alırken bir hata oluştu.</h2>
          </div>
        ) : cars.length < 1 ? (
          <div className="home__error-container">
            <h2>Üzgünüz, aradığınız kriterlere uygun araba bulunamadı.</h2>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {cars.map((car, i) => (
                <Card key={i} car={car} />
              ))}
            </div>
            <ShowMore />
          </section>
        )}
      </div>
    </div>
  );
};

export default MainPage;
