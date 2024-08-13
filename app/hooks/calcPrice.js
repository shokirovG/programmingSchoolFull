function calcPrice(
  price,
  foiz,
  department,
  store = {
    kurs: {
      kurses: [],
    },
  }
) {
  console.log("price", store);
  let qarz = 0;
  const kursPrice = store.kurs.kurses.filter((el) => el.kurs === department)[0];
  if (kursPrice) {
    qarz = kursPrice.price - foiz - price;
  }

  // switch (department) {
  //   case "Dasturlash": {
  //     qarz = 350000 - foiz - price;
  //     break;
  //   }
  //   case "Scretch": {
  //     qarz = 200000 - foiz - price;
  //     break;
  //   }
  //   case "K.S": {
  //     qarz = 240000 - foiz - price;
  //     break;
  //   }
  //   case "Ingliz-tili": {
  //     qarz = 240000 - foiz - price;
  //     break;
  //   }

  //   default:
  //     qarz;
  // }
  return qarz;
}

export { calcPrice };
