const mongoose = require("mongoose");

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

    name: {
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
        required: false
      },
      stock_holdings: [{
        stock_symbol: {
          type: String,
          required: false
        },
        quantity: {
          type: Number,
          required: false
        },
        purchase_price: {
          type: Number,
          required: false
        },
        purchase_date: {
          type: Date,
          required: false
        }
      }],
      cash_holding: {
        cash_in_hand: {
          type: Number,
          default: 0,
          required: false
        },
        intraday_profit_loss: {
          type: Number,
          default: 0,
          required: false
        }
      },
      intraday_holdings: {
        intraday_buy: {
          type: Number,
          default: 0,
          required: false
        },
        intraday_sell: {
          type: Number,
          default: 0,
          required: false
        }
      },

      // Portfolio value history for tracking value over time
      portfolio_value_history: [{
        value: {
          type: Number,  // The portfolio value at a specific point in time
          required: false
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
        required: false,
        default: 'basic'
      },
      start_date: {
        type: Date,
        default: Date.now
      },
      end_date: {
        type: Date,
        required: false
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