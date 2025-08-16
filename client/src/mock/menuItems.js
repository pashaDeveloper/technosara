import { BsLaptop, BsBook } from "react-icons/bs";
import { IoShirtOutline, IoShirtSharp } from "react-icons/io5";
import { MdOutlineToys } from "react-icons/md";
import { RiHeartPulseLine, RiFireLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlinePercentage } from "react-icons/ai";
import { BiFootball } from "react-icons/bi";

import { ImMobile } from "react-icons/im";
import { FiMonitor, FiHeadphones } from "react-icons/fi";

import { GiLargeDress } from "react-icons/gi";
import { FaBaby, FaRedhat } from "react-icons/fa";

const menuItems = [
  {
    category: "دیجیتال",
    icon: BsLaptop,
    productsGroup: [
      {
        title: "لپ‌تاپ",
        icon: BsLaptop,
        subtitles: [
          "ایسوس",
          "اپل",
          "دل",
          "لنوو",
          "سامسونگ",
          "اچ‌پی",
          "هوآوی",
          "ایسر",
          "ام‌اس‌آی",
        ],
      },
      {
        title: "موبایل",
        icon: ImMobile,
        subtitles: [
          "سامسونگ",
          "اپل",
          "نوکیا",
          "شیائومی",
          "موتورولا",
          "ال‌جی",
          "سونی",
        ],
      },
      {
        title: "کامپیوتر",
        icon: FiMonitor,
        subtitles: ["مانیتور", "ماوس", "کیبورد", "هارد"],
      },
      {
        title: "سایر",
        icon: FiHeadphones,
        subtitles: ["تبلت", "پاوربانک", "اسپیکر", "هدفون"],
      },
    ],
  },
  {
    category: "مد و پوشاک",
    icon: IoShirtOutline,
    productsGroup: [
      {
        title: "زنانه",
        icon: GiLargeDress,
        subtitles: [
          "پیراهن",
          "دامن",
          "جین",
          "شلوار",
          "تی‌شرت",
          "کفش",
          "شال و روسری",
        ],
      },
      {
        title: "مردانه",
        icon: IoShirtSharp,
        subtitles: ["پیراهن", "شلوار", "کراوات", "تی‌شرت", "کفش", "جین"],
      },
      {
        title: "کودک",
        icon: FaBaby,
        subtitles: ["سرهمی", "دستکش", "پیش‌بند", "کفش", "تی‌شرت"],
      },
      {
        title: "اکسسوری",
        icon: FaRedhat,
        subtitles: ["ساعت", "کیف پول", "کلاه", "کمربند"],
      },
    ],
  },
  { category: "اسباب‌بازی", icon: MdOutlineToys },
  { category: "آرایشی و بهداشتی", icon: RiHeartPulseLine },
  { category: "خانه", icon: AiOutlineHome },
  { category: "ورزشی", icon: BiFootball },
  { category: "نوشت‌افزار", icon: BsBook },
];

export default menuItems;

export const extraMenu = [
  { title: "پیشنهاد ویژه", icon: AiOutlinePercentage, href: "/پیشنهادات" },
  { title: "پرفروش‌ترین‌ها", icon: RiFireLine, href: "/پرفروش‌ها" },
];
