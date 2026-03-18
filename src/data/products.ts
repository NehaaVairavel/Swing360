import excavatorImg from "@/assets/excavator.jpg";
import backhoeImg from "@/assets/backhoe.jpg";
import dozerImg from "@/assets/dozer.jpg";
import materialHandlerImg from "@/assets/material-handler.jpg";
import skidSteerImg from "@/assets/skid-steer.jpg";
import graderImg from "@/assets/grader.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  priceValue: number;
  category: string;
  refNumber: string;
  usedHours: number;
  description: string;
  image: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "TATA HITACHI 120 ZAXIS",
    brand: "TATA HITACHI",
    model: "120 Zaxis",
    year: 2017,
    price: "₹18,50,000",
    priceValue: 1850000,
    category: "Excavators",
    refNumber: "SG36012",
    usedHours: 6000,
    description: "This machine is in excellent working condition and fully inspected. Ideal for construction and earthmoving operations. Maintained with high-quality standards.",
    image: excavatorImg,
    images: [excavatorImg, backhoeImg, dozerImg, graderImg],
  },
  {
    id: "2",
    name: "CAT 320 Excavator",
    brand: "Caterpillar",
    model: "320 GC",
    year: 2020,
    price: "₹45,00,000",
    priceValue: 4500000,
    category: "Excavators",
    refNumber: "SG36018",
    usedHours: 3200,
    description: "Premium CAT excavator with low hours. Perfect for heavy-duty construction projects. Full service history available.",
    image: excavatorImg,
    images: [excavatorImg, dozerImg, backhoeImg, skidSteerImg],
  },
  {
    id: "3",
    name: "JCB 3DX Backhoe Loader",
    brand: "JCB",
    model: "3DX Super",
    year: 2019,
    price: "₹22,00,000",
    priceValue: 2200000,
    category: "Backhoe Loaders",
    refNumber: "SG36024",
    usedHours: 4500,
    description: "Versatile backhoe loader suitable for multiple applications. Well-maintained with all original parts.",
    image: backhoeImg,
    images: [backhoeImg, excavatorImg, dozerImg, graderImg],
  },
  {
    id: "4",
    name: "CAT D6 Dozer",
    brand: "Caterpillar",
    model: "D6T XL",
    year: 2018,
    price: "₹55,00,000",
    priceValue: 5500000,
    category: "Dozers",
    refNumber: "SG36031",
    usedHours: 5100,
    description: "Powerful dozer for heavy earthmoving. Equipped with GPS and auto-grade system. Excellent undercarriage condition.",
    image: dozerImg,
    images: [dozerImg, excavatorImg, backhoeImg, graderImg],
  },
  {
    id: "5",
    name: "Liebherr LH 40 Material Handler",
    brand: "Liebherr",
    model: "LH 40",
    year: 2016,
    price: "₹38,00,000",
    priceValue: 3800000,
    category: "Material Handlers",
    refNumber: "SG36042",
    usedHours: 7200,
    description: "Industrial material handler perfect for scrap yards and recycling operations. Hydraulic cab riser included.",
    image: materialHandlerImg,
    images: [materialHandlerImg, excavatorImg, backhoeImg, dozerImg],
  },
  {
    id: "6",
    name: "Bobcat T770 Skid Steer",
    brand: "Bobcat",
    model: "T770",
    year: 2021,
    price: "₹28,00,000",
    priceValue: 2800000,
    category: "Skid Steers",
    refNumber: "SG36055",
    usedHours: 1800,
    description: "Compact track loader with exceptional power. Low hours, like-new condition. Multiple attachments available.",
    image: skidSteerImg,
    images: [skidSteerImg, excavatorImg, backhoeImg, dozerImg],
  },
  {
    id: "7",
    name: "CAT 140M Motor Grader",
    brand: "Caterpillar",
    model: "140M3",
    year: 2019,
    price: "₹62,00,000",
    priceValue: 6200000,
    category: "Graders",
    refNumber: "SG36068",
    usedHours: 4000,
    description: "Premium motor grader for road construction. AccuGrade GPS system installed. Excellent blade and tire condition.",
    image: graderImg,
    images: [graderImg, excavatorImg, backhoeImg, dozerImg],
  },
  {
    id: "8",
    name: "Komatsu PC200 Excavator",
    brand: "Komatsu",
    model: "PC200-8",
    year: 2018,
    price: "₹32,00,000",
    priceValue: 3200000,
    category: "Excavators",
    refNumber: "SG36075",
    usedHours: 5500,
    description: "Reliable Komatsu excavator with strong hydraulic performance. Recently serviced with new filters and fluids.",
    image: excavatorImg,
    images: [excavatorImg, backhoeImg, dozerImg, graderImg],
  },
];

export const categories = ["All", "Excavators", "Backhoe Loaders", "Dozers", "Material Handlers", "Skid Steers", "Graders"];
