// import Address from "../../model/Address";
// import {
//   FETCH_PROFILE,
//   AGENT_REG,
//   LOGOUT,
//   AUTHENTICATE,
// } from "../../Redux/Actions/Auth";
import { ActionSheetIOS } from "react-native";
import {
  FETCH_CATEGORIES,
  FETCH_PRODUCT,
  FETCH_SLIDER,
  RECENT_PRODUCTS,
  SET_PRODUCT_EMPTY,
  ADD_PRODUCT,
  ADD_SUB_CATS,
  ADD_CATAGORIES,
} from "../Action/Products";

const initialState = {
  Products: [],
  catProducts: [],
  subCats: [],
  sliderImages: [],
  recentProducts: [
    {
      Name: "7up Regular 591ML 1Ct",
      Description: null,
      ProductPrice: {
        CurrencyCode: "CAD",
        OldPrice: null,
        Price: "$1.05",
        PriceWithDiscount: null,
        PriceValue: 1.05,
        CustomerEntersPrice: false,
        CallForPrice: false,
        ProductId: 77,
        HidePrices: false,
        IsRental: false,
        RentalPrice: null,
        DisplayTaxShippingInfo: false,
        BasePricePAngV: null,
        CustomProperties: {},
      },
      PictureModels: {
        DefaultPictureModel: {
          ImageUrl:
            "https://skybluewholesale.com/content/images/thumbs/0004975_7up-regular-591ml-1ct_550.jpeg",
          ThumbImageUrl: null,
          FullSizeImageUrl:
            "https://skybluewholesale.com/content/images/thumbs/0004975_7up-regular-591ml-1ct.jpeg",
          Title: "Picture of 7up Regular 591ML 1Ct",
          AlternateText: "Picture of 7up Regular 591ML 1Ct",
          CustomProperties: {},
        },
        PictureModels: [
          {
            ImageUrl:
              "https://skybluewholesale.com/content/images/thumbs/0004975_7up-regular-591ml-1ct_550.jpeg",
            ThumbImageUrl:
              "https://skybluewholesale.com/content/images/thumbs/0004975_7up-regular-591ml-1ct_100.jpeg",
            FullSizeImageUrl:
              "https://skybluewholesale.com/content/images/thumbs/0004975_7up-regular-591ml-1ct.jpeg",
            Title: "Picture of 7up Regular 591ML 1Ct",
            AlternateText: "Picture of 7up Regular 591ML 1Ct",
            CustomProperties: {},
          },
        ],
      },
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        Products: action.Products,
      };
      case ADD_SUB_CATS:
        return {
          ...state,
          subCats: action.subCats,
        }
        case ADD_CATAGORIES: 
        return {
          ...state,
          Products: state.Products.concat(action.Products)
        }
      case FETCH_PRODUCT:
        if (!state.catProducts) {
          console.log("INITIAL Products")
        return {
          ...state,
          catProducts: action.catProduct,
        };
      }
      case ADD_PRODUCT:
        return {
          ...state,
            catProducts: state.catProducts.concat(action.catProduct),
          };
      case SET_PRODUCT_EMPTY: 
      return {
      ...state,
        catProducts: [],
      };

    case FETCH_SLIDER:
      return {
        ...state,
        sliderImages: action.slider,
      };
        

    case RECENT_PRODUCTS:
      return {
        ...state,
        recentProducts: action.recentProducts,
      };

    // case AUTHENTICATE:
    //   return {
    //     ...state,
    //     Login: action.Login,
    //     token: action.token,
    //   };

    // case LOGOUT:
    //   return {
    //     ...state,
    //     Login: {},
    //     token: "",
    //   };

    // // case AGENT_REG:
    // //   return {
    // //     ...state,
    // //     agentId: action.agentId,
    // //   };
  }
  return state;
};
