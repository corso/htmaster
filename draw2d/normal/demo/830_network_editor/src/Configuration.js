/*
 * Copyright (c) 2010 Andreas Herz. All rights reserved.
 */

draw2d.Configuration=function(){};

// Set this flag to show some additional properties in the PropertyPanel
// Like Server.DBID,....
//
draw2d.Configuration.DEBUG=false;


// Modify this file or override the settings in your JS file
// before other draw2d files are loaded
//
draw2d.Configuration.THEME="default";
draw2d.Configuration.APP_PATH="";
draw2d.Configuration.IMAGEPATH="./theme/"+draw2d.Configuration.THEME+"/images/";
draw2d.Configuration.GET_XML="./getFile.php5";
draw2d.Configuration.SAVE_XML="./saveFile.php5";

// enable/disable the apply button.
//draw2d.Configuration.APPLY_XML=null;
draw2d.Configuration.APPLY_XML="./applyFile.php5";

// delay to wait before automatic, asynchron save of the model.
// -1 => disable autosave
//draw2d.Configuration.AUTOSAVE_IN_SECONDS=-1;
draw2d.Configuration.AUTOSAVE_IN_SECONDS=4;

// Some default values for network objects instantiation
//
draw2d.Configuration.DEFAULT_NETWORK_NAME = "Virtual Network";
draw2d.Configuration.DEFAULT_SWITCH_NAME = "Switch";
draw2d.Configuration.DEFAULT_SERVER_NAME = "Server";
draw2d.Configuration.DEFAULT_SERVER_RAM = 1024;
draw2d.Configuration.DEFAULT_SERVER_CPUS = 1;
draw2d.Configuration.DEFAULT_STORAGE_MB = 3000;
draw2d.Configuration.DEFAULT_STORAGE_QUALIFIER = "normal";
draw2d.Configuration.DEFAULT_IMAGE_NAME = "Image";
draw2d.Configuration.DEFAULT_IMAGE_FILENAME=null;
draw2d.Configuration.DEFAULT_IMAGE_IMAGETYPE=null;
draw2d.Configuration.DEFAULT_IMAGE_WRITEBACK=null;
draw2d.Configuration.DEFAULT_IMAGE_ORDER=1;
draw2d.Configuration.DEFAULT_IMAGE_BOOTORDER=null;
draw2d.Configuration.DEFAULT_IMAGE_READONLY=null;
draw2d.Configuration.DEFAULT_MOUNT_ORDER=1;
draw2d.Configuration.DEFAULT_NIC_IPADDRESS="";


draw2d.ImageTemplates= [
    {
      "name":"Debian",
      "file-name":"file1.iso",
      "image-type":"cdrom",
      "writeback":"none",
      "readonly":"true",
      "icon":draw2d.Configuration.IMAGEPATH+"image_debian.png"
    },
    {
      "name":"Gentoo",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
      "icon":draw2d.Configuration.IMAGEPATH+"image_gentoo.png"
    },
    {
      "name":"My OS",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
    },
    {
      "name":"Fedora",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
      "icon":draw2d.Configuration.IMAGEPATH+"image_fedora.png"
    },
    {
      "name":"Mepis",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
      "icon":draw2d.Configuration.IMAGEPATH+"image_mepis.png"
    },
    {
      "name":"Red Hat",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
      "icon":draw2d.Configuration.IMAGEPATH+"image_redhat.png"
    },
    {
      "name":"Suse",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
      "icon":draw2d.Configuration.IMAGEPATH+"image_suse.png"
    },
    {
      "name":"Ubuntu",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
      "icon":draw2d.Configuration.IMAGEPATH+"image_ubuntu.png"
    },
    {
      "name":"Xandros",
      "file-name":"file2.iso",
      "image-type":"fdd",
      "writeback":"none",
      "readonly":"false",
      "icon":draw2d.Configuration.IMAGEPATH+"image_xandros.png"
    },
    {
      "name":"Music Sampler 1",
      "file-name":"file2.iso",
      "image-type":"cdrom",
      "writeback":"none",
      "readonly":"true",
      "icon":draw2d.Configuration.IMAGEPATH+"image_mymusic.png"
    }
  ];


// I18N Definitions
//
draw2d.I18N=function(){};

draw2d.I18N.PALETTE_OBJECT_HEADER="Network Objects";
draw2d.I18N.PALETTE_OBJECT_SERVER_LABEL="Server";
draw2d.I18N.PALETTE_OBJECT_SERVER_TOOLTIP="Drag the server element into the network canvas";
draw2d.I18N.PALETTE_OBJECT_STORAGE_LABEL="Storage";
draw2d.I18N.PALETTE_OBJECT_STORAGE_TOOLTIP="Drag the storage element into the network canvas";
draw2d.I18N.PALETTE_OBJECT_SWITCH_LABEL="Switch";
draw2d.I18N.PALETTE_OBJECT_SWITCH_TOOLTIP="Drag the switch element into the network canvas";

draw2d.I18N.PROPERTYPANEL_HEADER_DEFAULT="Network Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_MOUNT="Mount Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_NIC="Nic Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_SERVER="Server Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_STORAGE="Storage Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_SWITCH="Switch Properties";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_NAME="Name";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_ORDERINDEX="Order Index";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IPADDRESS="IP Address";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_CPUUNITS="CPU Units";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_RAM_MB="RAM in MB";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_STORAGE_MB="Storage in MB";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_QUALIFIER="Qualifier";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGES="Installed Images";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_BOOTORDER="Boot Order:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_FILENAME="File Name:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_TYPE="Type:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_WRITEBACK="Writeback:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_READONLY="Readonly:";

draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_SERVER_CPUUNITS="CPU Units:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_SERVER_RAM="RAM:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_STORAGE_QUALIFIER="Qualifier:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_STORAGE_STORAGE="Storage:";

draw2d.I18N.ERRORMESSAGE_NULL_MODEL="Unable to load Virtual Network configuration from Cloud";
draw2d.I18N.ERRORMESSAGE_WRONG_MODELURL="Unable to load network configuration from: ";
draw2d.I18N.ERRORMESSAGE_APPLY_ERROR_404="Unable to apply network configuration.";
draw2d.I18N.ERRORMESSAGE_SAVE_ERROR_404="Unable to save network configuration.";

draw2d.I18N.TOOLTIP_BUTTON_ADD_IMAGE="Add an additional Image to the Server";
draw2d.I18N.TOOLTIP_BUTTON_REMOVE_IMAGE="Remove Image from Server";

draw2d.I18N.DIALOG_ADDIMAGE_HEADER="Select Image to Add";
draw2d.I18N.DIALOG_ADDIMAGE_OK="Select";
draw2d.I18N.DIALOG_ADDIMAGE_CANCEL="Cancel";

draw2d.I18N.TOOLBAR_BUTTON_SAVE_XML="Save";
draw2d.I18N.TOOLBAR_BUTTON_APPLY_XML="Apply";
draw2d.I18N.TOOLBAR_BUTTON_SHOW_XML="Show XML";
draw2d.I18N.TOOLBAR_BUTTON_UNDO="Undo";
draw2d.I18N.TOOLBAR_BUTTON_REDO="Redo";


