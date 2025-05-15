const User = require('../models/User');
const Signal = require('../models/Signal');
const Log = require('../models/Log');
const Invoice = require('../models/Invoice');
const Configuration = require('../models/Configuration');

// GET
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getAllSignals = async (req, res) => {
  const signals = await Signal.find();
  res.json(signals);
};

const getAllLogs = async (req, res) => {
  const logs = await Log.find().sort({ timestamp: -1 }).limit(1000);
  res.json(logs);
};

const getAllInvoices = async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
};

const getConfiguration = async (req, res) => {
  const config = await Configuration.findOne();
  res.json(config);
};

const updateConfiguration = async (req, res) => {
  const update = await Configuration.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(update);
};

// PUT : Update user by admin
const updateUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, subscription } = req.body;

    const update = {};

    if (role) update.role = role;

    if (subscription) {
      update.subscription = {
        active: subscription.active || false,
        plan: subscription.plan || '12m',
        expiresAt: subscription.expiresAt || null
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erreur mise à jour admin :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllUsers,
  getAllSignals,
  getAllLogs,
  getAllInvoices,
  getConfiguration,
  updateConfiguration,
  updateUserByAdmin
};
