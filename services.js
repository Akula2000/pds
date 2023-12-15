function addServiceLocation() {
    var locationName = document.getElementById('locationName').value;
    var serviceLocations = document.getElementById('serviceLocations');

    var listItem = document.createElement('li');
    listItem.textContent = locationName;
    serviceLocations.appendChild(listItem);
}

function loadDeviceModels() {
    var deviceType = document.getElementById('deviceType').value;
    var deviceModelSelect = document.getElementById('deviceModel');
    deviceModelSelect.innerHTML = '';

    var models = getDeviceModels(deviceType);
    models.forEach(function (model) {
        var option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        deviceModelSelect.appendChild(option);
    });
}

function addSmartDevice() {
    var deviceType = document.getElementById('deviceType').value;
    var deviceModel = document.getElementById('deviceModel').value;
    var smartDevices = document.getElementById('smartDevices');

    var listItem = document.createElement('li');
    listItem.textContent = deviceType + ': ' + deviceModel;
    smartDevices.appendChild(listItem);
}

function getDeviceModels(deviceType) {
    // Add your logic to retrieve device models based on the device type from the server or database.
    // For simplicity, using hardcoded models in this example.
    var modelMap = {
        refrigerator: ['Bosch 800', 'Samsung SmartFridge', 'LG InstaView'],
        ac: ['GE 4500', 'Carrier Infinity', 'Daikin Smart AC'],
        light: ['IKEA Smart Bulb', 'Philips Hue', 'LIFX']
    };

    return modelMap[deviceType] || [];
}

// ... (previous functions remain unchanged)

function addServiceLocation() {
    var locationName = document.getElementById('locationName').value;
    var serviceLocationsTableBody = document.getElementById('serviceLocationsTableBody');
    if (!locationName.trim()) {
        alert('Location name cannot be empty.');
        return;
    }

    // Add the location to the table
    var row = serviceLocationsTableBody.insertRow();
    var cell = row.insertCell(0);
    cell.textContent = locationName;

    // TODO: Add logic to send the location to the server and store in the database
}

function addSmartDevice() {
    var deviceType = document.getElementById('deviceType').value;
    var deviceModel = document.getElementById('deviceModel').value;
    var smartDevicesTableBody = document.getElementById('smartDevicesTableBody');

    if (!deviceType || !deviceModel) {
        alert('Please select both device type and device model.');
        return;
    }
    // Add the device to the table
    var row = smartDevicesTableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.textContent = deviceType;
    cell2.textContent = deviceModel;

    // TODO: Add logic to send the device to the server and store in the database
}


function clearServiceLocations() {
    var serviceLocationsTableBody = document.getElementById('serviceLocationsTableBody');
    serviceLocationsTableBody.innerHTML = ''; // Clear the table

    // TODO: Add logic to send a request to the server to clear service locations in the database
}

function clearSmartDevices() {
    var smartDevicesTableBody = document.getElementById('smartDevicesTableBody');
    smartDevicesTableBody.innerHTML = ''; // Clear the table

    // TODO: Add logic to send a request to the server to clear smart devices in the database
}

function deleteServiceLocation(row) {
    var index = row.parentNode.parentNode.rowIndex;
    row.parentNode.parentNode.deleteRow(index);

    // TODO: Add logic to send a request to the server to delete the corresponding service location in the database
}

function deleteSmartDevice(row) {
    var index = row.parentNode.parentNode.rowIndex;
    row.parentNode.parentNode.deleteRow(index);

    // TODO: Add logic to send a request to the server to delete the corresponding smart device in the database
}