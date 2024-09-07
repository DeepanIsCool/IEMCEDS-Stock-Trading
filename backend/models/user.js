const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: false,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    ProfileImage: {
      type: String,
      required: false,
    },

    portfolios: [{
      portfolio_name: {
        type: String, // Allow users to name portfolios
        required: true
      },

      stock_holdings: [{
        stock_symbol: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        purchase_price: {
          type: Number,
          required: true
        },
        purchase_date: {
          type: Date,
          required: true
        }
      }],

      cash_holding: {
        cash_in_hand: {
          type: Number,
          default: 0,
          required: true
        },
        intraday_profit_loss: {
          type: Number,  // Can be positive (profit) or negative (loss)
          default: 0,
          required: true
        }
      },

      intraday_holdings: {
        intraday_buy: {
          type: Number,  // Amount bought intraday
          default: 0,
          required: true
        },
        intraday_sell: {
          type: Number,  // Amount sold intraday
          default: 0,
          required: true
        }
      }
    }],

    membership : {
      plan_type: {
        type: String, // E.g., "free", "premium", "pro"
        enum: ['basic', 'pro', 'elite'], // Limit to these specific values
        required: true,
        default: 'free'
      },
      start_date: {
        type: Date,
        default: Date.now // Start date defaults to the current date
      },
      end_date: {
        type: Date, // End date for when the membership expires
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'], // Track the status of the membership
        default: 'active'
      }
    },

    access_token: {
      type: String,
    },
  },
  


  { timestamps: true }
);

const User = mongoose.model("Users", userSchema, "USERS");
module.exports = User;