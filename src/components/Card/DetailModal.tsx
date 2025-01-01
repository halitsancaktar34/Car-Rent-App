import { CarType } from '../../types';
import { generateImage } from '../../utils/generataImage';
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from 'react';

type ModalPropsType = {
  car: CarType;
  isOpen: boolean;
  close: () => void;
};

const DetailModal = ({ car, isOpen, close }: ModalPropsType) => {
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoadingImages(true);
      const timer = setTimeout(() => setLoadingImages(false), 1000); // Resim yüklenme simülasyonu
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-20 grid place-items-center p-4">
          <motion.div
          role="dialog"
            initial={{
              scale: 0.3,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="p-6 relative bg-white w-full max-w-lg max-h-[90vh] rounded-2xl flex flex-col gap-5 shadow-xl overflow-auto"
          >
            {/* kapatma butonu */}
            <button
              onClick={close}
              className="cursor-pointer p-1 absolute end-1 top-1 z-10 bg-white rounded-full"
            >
              <img src="/close.svg" alt="Close" />
            </button>

            {/* fotoğraflar */}
            <div className="flex-1 flex flex-col gap-3">
              {loadingImages ? (
                <div
                 role="status"
                className="flex justify-center items-center h-[268px]">
                  <div className="w-24 h-24 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                  </div>
              ) : (
                <>
                  {/* büyük resim */}
                  <div className="w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                    <img
                      className="h-full mx-auto object-contain"
                      src={generateImage(car)}
                      alt="Car Detail"
                    />
                  </div>
                  {/* küçük resimler */}
                  <div className="flex gap-3">
                    <div className="flex-1 flex relative h-24 bg-primary-blue-100">
                      <img
                        className="h-full mx-auto object-contain"
                        src={generateImage(car, '29')}
                        alt="Car Angle 29"
                      />
                    </div>
                    <div className="flex-1 flex relative h-24 bg-primary-blue-100">
                      <img
                        className="h-full mx-auto object-contain"
                        src={generateImage(car, '33')}
                        alt="Car Angle 33"
                      />
                    </div>
                    <div className="flex-1 flex relative h-24 bg-primary-blue-100">
                      <img
                        className="h-full mx-auto object-contain"
                        src={generateImage(car, '13')}
                        alt="Car Angle 13"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* detaylar */}
            {Object.entries(car) // objeyi diziye çevir
              .filter((item) => item[0] !== 'year') // yıl değerini kaldır
              .map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <h4 className="capitalize text-gray">
                    {key.replace('_', ' ')}
                  </h4>
                  <p className="capitalize text-black-100 font-semibold">
                    {value}
                  </p>
                </div>
              ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
