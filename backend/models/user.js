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
        type: String,
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
          type: Number,
          default: 0,
          required: true
        }
      },
      intraday_holdings: {
        intraday_buy: {
          type: Number,
          default: 0,
          required: true
        },
        intraday_sell: {
          type: Number,
          default: 0,
          required: true
        }
      },

      // Portfolio value history for tracking value over time
      portfolio_value_history: [{
        value: {
          type: Number,  // The portfolio value at a specific point in time
          required: true
        },
        timestamp: {
          type: Date,    // When this value was recorded
          default: Date.now
        }
      }]
    }],

    membership: {
      plan_type: {
        type: String,
        enum: ['basic', 'pro', 'elite'],
        required: true,
        default: 'free'
      },
      start_date: {
        type: Date,
        default: Date.now
      },
      end_date: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
      }
    },

    access_token: {
      type: String,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema, "USERS");
module.exports = User;