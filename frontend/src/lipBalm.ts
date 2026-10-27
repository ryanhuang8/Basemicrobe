import image from "./assets/vegan-lip-balm.png";

export const lipBalm = {
  image,
  price: "$10.00",
  unitPrice: 10,
  bg: "#f0ebe2",
  path: "/products/vegan-lip-balm",
};

// Product copy transcribed/adapted from the supplied concept, label and label image.
// The label's conflicting ounce value is omitted; only the stated 10 g is used.
export const lipBalmCopy = {
  en: {
    name: "Vegan Lip Balm",
    tag: "Lip Care",
    styleLabel: "Formula",
    style: "Carotene",
    shortDescription: "A vegan, microplastic-free lip balm with plant-based oils and wax in a paperboard push-up tube.",
    back: "All products",
    quantity: "Quantity",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    addToCart: "Add to Cart",
    added: "Added to your cart.",
    viewCart: "View cart",
    unit: "USD · 10 g",
    imageAlt: "Carotene Vegan Lip Balm in a paperboard push-up tube with its cap alongside",
    details: [
      {
        title: "Description",
        paragraphs: [
          "Carotene Vegan Lip Balm combines plant-based oils and candelilla wax in a paperboard push-up tube. Its bio-based formula is made without animal-derived ingredients or microplastics.",
          "The vegan formulation uses plant-based alternatives to ingredients such as beeswax, carmine, lanolin and animal-derived collagen. Paperboard and plastic-free packaging replace conventional plastic tubes and caps.",
        ],
      },
      {
        title: "Features",
        items: [
          "Vegan formula with plant-based oils and wax",
          "Microplastic-free, bio-based formula",
          "Paperboard push-up tube and plastic-free packaging",
          "No added phthalates or parabens",
          "Hand poured in small batches in a plastic-free setting",
        ],
      },
      {
        title: "How to Use",
        paragraphs: ["Push up gently from the bottom and apply directly to lips."],
      },
      {
        title: "Ingredients",
        paragraphs: [
          "Liposoluble β-carotene, Vitamins C* & E, Stearic Acid*, Choline*, Oils (Olive, Jojoba & Coconut), Candelilla Wax, Rose Essential Oil.",
          "*Bio-based.",
        ],
      },
      { title: "Net Weight", paragraphs: ["10 g"] },
      { title: "Storage", paragraphs: ["Store in a cool, dry place."] },
      { title: "Design & Production", paragraphs: ["Designed by Basemicrobe Inc., in USA. Hand poured in small batches in a plastic-free setting."] },
    ],
  },
  zh: {
    name: "纯素润唇膏",
    tag: "唇部护理",
    styleLabel: "配方",
    style: "胡萝卜素",
    shortDescription: "采用植物油与植物蜡的纯素无微塑料润唇膏，搭配纸质按推式包装。",
    back: "所有商品",
    quantity: "数量",
    decrease: "减少数量",
    increase: "增加数量",
    addToCart: "加入购物车",
    added: "已加入购物车。",
    viewCart: "查看购物车",
    unit: "美元 · 10 g",
    imageAlt: "胡萝卜素纯素润唇膏，采用纸质按推式管身，旁边放置管盖",
    details: [
      {
        title: "商品描述",
        paragraphs: [
          "胡萝卜素纯素润唇膏将植物油与小烛树蜡结合，装入纸质按推式管身。生物基配方不含动物来源成分和微塑料。",
          "以植物来源成分替代蜂蜡、胭脂红、羊毛脂和动物来源胶原蛋白等原料，使用纸板及无塑料包装材料替代传统塑料管身和管盖。",
        ],
      },
      {
        title: "产品特点",
        items: [
          "纯素配方，采用植物油与植物蜡",
          "无微塑料生物基配方",
          "纸质按推式管身与无塑料包装",
          "未添加邻苯二甲酸酯或对羟基苯甲酸酯",
          "在无塑料环境中小批量手工灌装",
        ],
      },
      { title: "使用方法", paragraphs: ["从底部轻轻向上推出膏体，直接涂抹于双唇。"] },
      {
        title: "成分",
        paragraphs: [
          "脂溶性 β-胡萝卜素、维生素 C* 和 E、硬脂酸*、胆碱*、植物油（橄榄油、霍霍巴油及椰子油）、小烛树蜡、玫瑰精油。",
          "*生物基成分。",
        ],
      },
      { title: "净含量", paragraphs: ["10 g"] },
      { title: "储存方法", paragraphs: ["存放于阴凉干燥处。"] },
      { title: "设计与生产", paragraphs: ["由 Basemicrobe Inc. 在美国设计，在无塑料环境中小批量手工灌装。"] },
    ],
  },
};
