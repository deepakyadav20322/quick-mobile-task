const Service = require("../model/servicesSchema");

// @desc    Create a new service
// @route   POST /api/services
const CreateService = async (req, res) => {
  try {
    const { servicePic, serviceName } = req.body;

    if (!serviceName || !servicePic) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newService = new Service({ serviceName, servicePic });
    await newService.save();

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: newService,
    });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Get all services
// @route   GET /api/services
const GetServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Edit a service by ID
// @route   PUT /api/services/:id
const EditService = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceName, servicePic } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Service ID is required." });
    }

    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        serviceName: serviceName || existingService.serviceName,
        servicePic: servicePic || existingService.servicePic,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      data: updatedService,
    });
  } catch (error) {
    console.error("Edit Service Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete a service by ID
// @route   DELETE /api/services/:id
const DeleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Service ID is required." });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  CreateService,
  GetServices,
  EditService,
  DeleteService,
};
