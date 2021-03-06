var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/db');

exports.create = function() {
      
  db.serialize(function() {

    var name_array = new Array("COMPANY", 
      "RESTAURANT", 
      "SEPTIC", 
      "WELL", 
      "OWNER", 
      "PROPERTY", 
      "RESTAURANTINSPECTIONS", 
      "TYPEOFOPERATION", 
      "TYPEOFINSPECTION", 
      "REASONING", 
      "SYSTEMPUMPINGRECORD", 
      "SEPTICPUMPINGRECORD", 
      "VIOLATIONS", 
      "PRIVILEGES", 
      "USER", 
      "SAVEDSEARCHES", 
      "WATERQUALITYREPORT", 
      "SEPTICINSPECTION", 
      "DEPAPPROVAL", 
      "SYSTEMWILLPASSIF", 
      "SYSTEMWILLFAILIF", 
      "GENERALTYPEOFSYSTEM", 
      "BUILDINGSEWERMATERIAL", 
      "MATERIAL");

    var properties_array = [];
        properties_array["COMPANY"] = "CREATE TABLE COMPANY (ID INTEGER PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, AGE INT NOT NULL, ADDRESS CHAR(50), SALARY REAL)";    
        properties_array["RESTAURANT"] = "CREATE TABLE RESTAURANT( ID INTEGER PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, ADDRESS TEXT NOT NULL, OWNERID INT NOT NULL, PERSONINCHARGE TEXT NOT NULL, FOREIGN KEY(OWNERID) references OWNER(ID), FOREIGN KEY(ID) references RESTAURANTINSPECTIONS(RESTAURANTID))";
        properties_array["SEPTIC"] = "CREATE TABLE SEPTIC( ID INTEGER PRIMARY KEY NOT NULL, OWNERID INT NOT NULL, FOREIGN KEY(ID) references SYSTEMPUMPINGRECORD(SEPTICID), FOREIGN KEY(ID) references SEPTICINSPECTIONS(SEPTICID), FOREIGN KEY(OWNERID) references OWNER(ID) )";
        properties_array["WELL"] = "CREATE TABLE WELL( ID INTEGER PRIMARY KEY NOT NULL, OWNERID INT NOT NULL, FOREIGN KEY(ID) references WATERQUALITYREPORT(WELLID), FOREIGN KEY(OWNERID) references OWNER(ID) )";
        properties_array["OWNER"] = "CREATE TABLE OWNER(ID INTEGER PRIMARY KEY NOT NULL, OWNERNAME TEXT NOT NULL, TELEPHONENUMBER TEXT NOT NULL)";
        properties_array["PROPERTY"] = "CREATE TABLE PROPERTY( ID INTEGER PRIMARY KEY NOT NULL, GPSCOORDINATES REAL NOT NULL, ADDRESS TEXT NOT NULL, TOWN TEXT NOT NULL, STATE TEXT NOT NULL,   ZIPCODE INT NOT NULL, PLOTNUMER INT NOT NULL)"; 
        properties_array["RESTAURANTINSPECTIONS"] = "CREATE TABLE RESTAURANTINSPECTIONS( ID INTEGER PRIMARY KEY NOT NULL, RESTAURANTID INT NOT NULL, INSPECTOR TEXT NOT NULL, RISKLEVEL TEXT NOT NULL, HACCP INTEGER NOT NULL, TIMEIN INTEGER NOT NULL, TIMEOUT INTEGER NOT NULL, TYPEOFOPERATION INTEGER NOT NULL, TYPEOFINSPECTION INTEGER NOT NULL, PREVIOUSINSPECTIONDATE INTEGER, REASONING INTEGER NOT NULL, OTHERREASONING TEXT, MANAGEMENTANDPERSONNEL TEXT, FOODANDFOODPROTECTION TEXT, EQUIPMENTANDUTENSILS TEXT, WATERPLUMBINGANDWASTE TEXT, PHYSICALFACILITY TEXT, POISONOUSORTOXICMATERIALS TEXT, SPECIALREQUIREMENTS TEXT, OTHER0 TEXT, DISCUSSIONWITHPERSONINCHARGE TEXT, CORRECTIVEACTIONREQUIRED INT, VOLUNTARYCOMPLIANCE INT, REINSPECTIONSCHEDULED INT, VOLUNTARYDISPOSAL INT, EMPLOYEERESTRICTIONEXCLUSION INT, EMERGENCYSUSPENSION INT, EMERGENCYCLOSURE INT, OTHER1 INT, ADDITIONALNOTES TEXT, FOREIGN KEY(TYPEOFOPERATION) REFERENCES TYPEOFOPERATION(ID), FOREIGN KEY(TYPEOFINSPECTION) REFERENCES TYPEOFINSPECTION(ID), FOREIGN KEY(REASONING) REFERENCES REASONING(ID), FOREIGN KEY(ID) REFERENCES VIOLATIONS(RESTAURANTINSPECTIONID) );";
        properties_array["TYPEOFOPERATION"] = "CREATE TABLE TYPEOFOPERATION( ID INTEGER PRIMARY KEY    NOT NULL, OPERATIONTYPE TEXT NOT NULL)";
        properties_array["TYPEOFINSPECTION"] = "CREATE TABLE TYPEOFINSPECTION( ID INTEGER PRIMARY KEY NOT NULL, INSPECTIONTYPE TEXT NOT NULL );";
        properties_array["REASONING"] ="CREATE TABLE REASONING( ID INTEGER PRIMARY KEY NOT NULL, REASONING TEXT NOT NULL )";  
        properties_array["SYSTEMPUMPINGRECORD"] ="CREATE TABLE SYSTEMPUMPINGRECORD( ID INTEGER PRIMARY KEY NOT NULL, SEPTICID INT NOT NULL, PUMPINGDATE REAL NOT NULL, QUANTITYPUMPED REAL NOT NULL, SYSTEMQUALITYOTHER TEXT NOT NULL, EFFLUENTTEEFILTERPRESENT INT NOT NULL, IFYESWASITCLEANED INT NOT NULL, OBSERVEDCONDITION TEXT NOT NULL, SYSTEMPUMPEDBYNAME TEXT NOT NULL, SYSTEMPUMPEDBYLICENSE TEXT NOT NULL, SYSTEMPUMPEDBYCOMPANY TEXT NOT NULL, LOCATIONWHERECONTENTSWEREDISPOSED TEXT NOT NULL, HAULER TEXT NOT NULL, HAULERDATE TEXT NOT NULL, RECEIVINGFACILITY TEXT NOT NULL, RECEIVINGFACILITYDATE TEXT NOT NULL, FOREIGN KEY(SEPTICID) references SEPTIC(ID) )";
        properties_array["SEPTICPUMPINGRECORD"] ="CREATE TABLE SEPTICPUMPINGRECORD( ID INTEGER PRIMARY KEY NOT NULL, OPTION TEXT NOT NULL )";  
        properties_array["VIOLATIONS"] = "CREATE TABLE VIOLATIONS( ID INTEGER PRIMARY KEY NOT NULL, RESTAURANTINSPECTIONID INT NOT NULL, CODEREFERENCE TEXT NOT NULL, CRITICALORREDITEM TEXT NOT NULL, DESCRIPTIONOFVIOLATIONCORRECTIONPLAN TEXT NOT NULL, DATEVERIFIED TEXT NOT NULL, FOREIGN KEY(RESTAURANTINSPECTIONID) references RESTAURANTINSPECTIONS(ID) )";
        properties_array["PRIVILEGES"] = "CREATE TABLE PRIVILEGES( ID INTEGER PRIMARY KEY NOT NULL, PRIVILEGELEVEL INT NOT NULL, USERID INT NOT NULL, FOREIGN KEY(USERID) references USER(ID) )"; 
        properties_array["USER"] = "CREATE TABLE USER( ID INTEGER PRIMARY KEY NOT NULL, USERNAME TEXT NOT NULL, PASSWORDHASH NOT NULL, FOREIGN KEY(ID) references SAVEDSEARCHES(USERID), FOREIGN KEY(ID) references PRIVILEGES(USERID) )";
        properties_array["SAVEDSEARCHES"] = "CREATE TABLE SAVEDSEARCHES( ID INTEGER PRIMARY KEY NOT NULL, USERID INT NOT NULL, SAVEDSEARCH TEXT NOT NULL, FOREIGN KEY(USERID) references USER(ID) )"; 
        properties_array["WATERQUALITYREPORT"] = "CREATE TABLE WATERQUALITYREPORT( ID INTEGER PRIMARY KEY NOT NULL, WELLID INT NOT NULL, CLIENTNAME TEXT NOT NULL, COLLECTEDBY TEXT NOT NULL, PROJECTNAME TEXT NOT NULL, PROJECTNUMBER TEXT NOT NULL, DATECOLLECTED INT NOT NULL, SAMPLEIDENTIFICATION TEXT NOT NULL, LABNUMBER REAL NOT NULL, TOTALCOLIFORMBACTERIA REAL NOT NULL, TOTALCOLIFORMBACTERIAUNITS TEXT NOT NULL, NITRATENITROGEN REAL NOT NULL, NITRATENITROGENUNITS TEXT NOT NULL, PH REAL NOT NULL, PHUNITS TEXT NOT NULL, IRON REAL NOT NULL, IRONUNITS TEXT NOT NULL, HARDNESSASCACO3 REAL NOT NULL, HARDNESSASCACO3UNITS TEXT NOT NULL, SULFATESULFUR REAL NOT NULL, SULFATESULFUREUNITS TEXT NOT NULL, CHLORIDE REAL NOT NULL, SPECIFICCONDUCTANCE REAL NOT NULL, SPECIFICCONDUCTANCEUNITS TEXT NOT NULL, THISWATERSAMPLEPASSESDRINKINGWATERSTANDARDS INT NOT NULL, SUBMITTEDBY TEXT NOT NULL, ADDITIONALNOTES TEXT, FOREIGN KEY(WELLID) references WELL(ID) );";
        properties_array["SEPTICINSPECTION"] = "CREATE TABLE SEPTICINSPECTION( ID INTEGER PRIMARY KEY NOT NULL, NAMEOFINSPECTOR TEXT NOT NULL, COMPANYNAME TEXT NOT NULL, COMPANYADDRESS TEXT NOT NULL, CITY TEXT NOT NULL, STATE TEXT NOT NULL, ZIPCODE INTEGER NOT NULL, TELEPHONENUMBER TEXT NOT NULL, LICENSENUMBER TEXT NOT NULL, DEPAPPROVAL INTEGER NOT NULL, SYSTEMPASSES INTEGER, SYSTEMPASSESCOMMENTS TEXT, SYSTEMCONDITIONALLYPASSES INTEGER, SYSTEMCONDITIONALLYPASSESWILLPASSIFREPLACED INTEGER, SYSTEMCONDITIONALLYPASSESCOMMENTS TEXT, SYSTEMCONDITIONALLYPASSESALARMS INTEGER, SYSTEMCONDITIONALLYPASSESSEWAGE INTEGER, SYSTEMCONDITIONALLYPASSESSEWAGEPIPE INTEGER, SYSTEMCONDITIONALLYPASSESSEWAGEPIPECOMMENTS TEXT, SYSTEMCONDITIONALLYPASSESSEWAGEOBSTRUCTION INTEGER, SYSTEMCONDITIONALLYPASSESSEWAGEOBSTRUCTIONCOMMENTS TEXT, SYSTEMCONDITIONALLYPASSESSEWAGEDISTRIBUTION INTEGER, SYSTEMCONDITIONALLYPASSESSEWAGEDISTRIBUTIONCOMMENTS TEXT, SYSTEMCONDITIONALLYPASSESFOURPUMPS INTEGER, SYSTEMCONDITIONALLYPASSESFOURPUMPSPIPE INTEGER, SYSTEMCONDITIONALLYPASSESFOURPUMPSPIPECOMMENTS TEXT, SYSTEMCONDITIONALLYPASSESFOURPUMPSOBSTRUCTION INTEGER, SYSTEMCONDITIONALLYPASSESFOURPUMPSOBSTRUCTIONCOMMENTS TEXT, FURTHEREVALUATION INTEGER, FURTHEREVALUATIONSYSTEMWILLPASSIF INTEGER, FURTHEREVALUATIONSYSTEMWILLFAILIF INTEGER, FURTHEREVALUATIONFIFTYTOONEHUNDRED INTEGER, FURTHEREVALUATIONMETHODUSEDTODETERMINE TEXT, FURTHEREVALUATIONCOMMENTS TEXT, SYSTEMFAILUREBACKUP INTEGER, SYSTEMFAILUREDISCHARGE INTEGER, SYSTEMFAILURESTATICLIQUID INTEGER, SYSTEMFAILURELIQUIDDEPTH INTEGER, SYSTEMFAILUREREQUIREDPUMPING INTEGER, SYSTEMFAILUREBELOWHIGHGROUNDWATER INTEGER, SYSTEMFAILURESURFACEWATERSUPPLY INTEGER, SYSTEMFAILUREPUBLIC INTEGER, SYSTEMFAILUREPRIVATE INTEGER, SYSTEMFAILUREPRIVATEGREATER INTEGER, SYSTEMFAILUREGPD INTEGER, SYSTEMFAILUREFORREAL INTEGER, LARGESYSTEMSSURFACEDRINKING INTEGER, LARGESYSTEMSTRIBUTARY INTEGER, LARGESYSTEMSNITROGEN INTEGER, CHECKLISTINFORMATIONPROVIDED INTEGER, CHECKLISTPUMPEDOUTTWOWEEKS INTEGER, CHECKLISTNORMALFLOW INTEGER, CHECKLISTLARGEVOLUMESINTRODUCED INTEGER, CHECKLISTPLANSEXAMINED INTEGER, CHECKLISTBACKUPINSPECTED INTEGER, CHECKLISTBREAKOUTINSPECTED INTEGER, CHECKLISTCOMPONENTSONSITE INTEGER, CHECKLISTINTERIORINSPECTION INTEGER, CHECKLISTFACILITYOWNER INTEGER, CHECKLISTEXISTINGINFORMATION INTEGER, CHECKLISTDETERMINED INTEGER, RESIDENTIALBEDROOMSDESIGN INTEGER, RESIDENTIALBEDROOMSACTUAL INTEGER, RESIDENTIALDESIGNFLOW INTEGER, RESIDENTIALCOMMENTS TEXT, RESIDENTIALRESIDENTS INTEGER, RESIDENTIALGARBAGEGRINDER INTEGER, RESIDENTIALLAUNDRYSEPARATE INTEGER, RESIDENTIALLAUNDRYINSPECTION INTEGER, RESIDENTIALSEASONALUSE INTEGER, RESIDENTIALWATERMETERREADINGS INTEGER, RESIDENTIALWATERMETERCOMMENTS TEXT, RESIDENTIALSUMPPUMP INTEGER, RESIDENTIALDATEOFOCCUPANCY INTEGER, COMMERCIALTYPE TEXT, COMMERCIALDESIGNFLOW INTEGER, COMMERCIALBASISOFDESIGNFLOW TEXT, COMMERCIALGREASETRAP INTEGER, COMMERCIALINDUSTRIALWASTE INTEGER, COMMERCIALWASTEDISCHARGE INTEGER, COMMERCIALWATERMETERREADINGS TEXT, COMMERCIALDATEOFOCCUPANCY INTEGER, COMMERCIALCOMMENTS TEXT, GENERALSOURCE TEXT, GENERALPUMPED INTEGER, GENERALVOLUMEPUMPED INTEGER, GENERALQUANTITYDETERMINED TEXT, GENERALREASONFORPUMPED TEXT GENERALTYPEOFSYSTEM INTEGER, GENERALTYPEOFSYSTEMCOMMENT TEXT, GENERALCOMPONENTAGE INTEGER, GENERALCOMPONENTDATE INTEGER, GENERALCOMPONENTSOURCE TEXT, GENERALSEWAGEODORS INTEGER, BUILDINGSEWERDEPTHBELOWGRADE INTEGER, BUILDINGSEWERMATERIAL INTEGER, BUILDINGSEWERMATERIALCOMMENT TEXT, BUILDINGSEWERDISTANCEFROMPRIVATE INTEGER, BUILDINGSEWERCOMMENTS TEXT, SEPTICTANKDEPTHBELOWGRADE INTEGER, SEPTICTANKMATERIAL INTEGER, SEPTICTANKMATERIALCOMMENT TEXT, SEPTICTANKMETALAGE INTEGER, SEPTICTANKCOMPLIANCE INTEGER, SEPTICTANKDIMENSIONS TEXT, SEPTICTANKSLUDGEDEPTH INTEGER, SEPTICTANKDISTANCEFROMTOPOFSLUDGE INTEGER, SEPTICTANKSCUMTHICKNESS INTEGER, SEPTICTANKDISTANCEFROMTOPOFSCUM INTEGER, SEPTICTANKDISTANCEFROMBOTTOMOFSCUM INTEGER, SEPTICTANKDIMENSIONSOBTAINED TEXT, SEPTICTANKCOMMENTS TEXT, GREASETRAPDEPTHBELOWGRADE INTEGER, GREASETRAPMATERIAL INTEGER, GREASETRAPMATERIALCOMMENT TEXT, GREASETRAPDIMENSIONS TEXT, GREASETRAPSCUMTHICKNESS INTEGER, GREASETRAPDISTANCEFROMTOPOFSCUM INTEGER, GREASETRAPDISTANCEFROMBOTTOMOFSCUM INTEGER, GREASETRAPDATEOFLASTPUMPING INTEGER, GREASETRAPCOMMENTS TEXT, TIGHTORHOLDINGTANKDEPTHBELOWGRADE INTEGER, TIGHTORHOLDINGTANKMATERIAL INTEGER, TIGHTORHOLDINGTANKMATERIALCOMMENT TEXT, TIGHTORHOLDINGTANKDIMENSIONS TEXT, TIGHTORHOLDINGTANKCAPACITY INTEGER, TIGHTORHOLDINGTANKDESIGNFLOW INTEGER, TIGHTORHOLDINGTANKALARMPRESENT INTEGER, TIGHTORHOLDINGTANKALARMLEVEL TEXT, TIGHTORHOLDINGTANKALARMWORKING INTEGER, TIGHTORHOLDINGTANKDATEOFLASTPUMPING INTEGER, TIGHTORHOLDINGTANKCOMMENTS TEXT, DISTRIBUTIONBOXDEPTHOFLIQUID INTEGER, DISTRIBUTIONBOXCOMMENTS TEXT, PUMPCHAMBERPUMPSWORK INTEGER, PUMPCHAMBERALARMWORK INTEGER, PUMPCHAMBERCOMMENTS TEXT, SOILABSORPTIONSYSTEMCOMMENTS INTEGER, SOILABSORPTIONLEACHINGPITS INTEGER, SOILABSORPTIONLEACHINGPITSNUMBER INTEGER, SOILABSORPTIONLEACHINGCHAMBERS INTEGER, SOILABSORPTIONLEACHINGCHAMBERSNUMBER INTEGER, SOILABSORPTIONLEACHINGGALLERIES INTEGER, SOILABSORPTIONLEACHINGGALLERIESNUMBER INTEGER, SOILABSORPTIONLEACHINGTRENCHES INTEGER, SOILABSORPTIONLEACHINGTRENCHESNUMBER INTEGER, SOILABSORPTIONLEACHINGTRENCHESLENGTH INTEGER, SOILABSORPTIONLEACHINGFIELDS INTEGER, SOILABSORPTIONLEACHINGFIELDSNUMBER INTEGER, SOILABSORPTIONLEACHINGFIELDSDIMENSION TEXT, SOILABSORPTIONOVERFLOWCESSPOOL INTEGER, SOILABSORPTIONOVERFLOWCESSPOOLNUMBER INTEGER, SOILABSORPTIONINNOVATIVE INTEGER, SOILABSORPTIONINNOVATIVENAME TEXT, SOILABSORPTIONCOMMENTS TEXT, CESSPOOLSNUMBER INTEGER, CESSPOOLSCONFIGURATION TEXT, CESSPOOLSDEPTHTOP INTEGER, CESSPOOLSDEPTHSOLID INTEGER, CESSPOOLSDEPTHSCUM INTEGER, CESSPOOLSDIMENSION TEXT, CESSPOOLSMATERIAL TEXT, CESSPOOLSINDICATIONOFGROUNDWATER INTEGER, CESSPOOLSCOMMENTS TEXT, PRIVYMATERIAL TEXT, PRIVYDIMENSIONS TEXT, PRIVYDEPTHOFSOLIDS INTEGER, PRIVYCOMMENTS TEXT, SITEEXAMCHECKSLOPE INTEGER, SITEEXAMSURFACEWATER INTEGER, SITEEXAMCHECKCELLAR INTEGER, SITEEXAMSHALLOWWELLS INTEGER, SITEEXAMDEPTHTOHIGHGROUNDWATER INTEGER, SITEEXAMMETHODSDESIGNPLANS INTEGER, SITEEXAMMETHODSDESIGNPLANSDATE INTEGER, SITEEXAMMETHODSOBSERVEDSITE INTEGER, SITEEXAMMETHODSCHECKEDWITHBOARDOFHEALTH INTEGER, SITEEXAMMETHODSCHECKEDWITHBOARDOFHEALTHCOMMENTS TEXT, SITEEXAMMETHODSCHECKEDWITHLOCALEXCAVATORS INTEGER, SITEEXAMMETHODSACCESSEDUSGS INTEGER, SITEEXAMMETHODSACCESSEDUSGSCOMMENTS TEXT, SITEEXAMDESCRIBE TEXT, REPORTCOMPLETENESSABCDE INTEGER, REPORTCOMPLETENESSD INTEGER, REPORTCOMPLETENESSSYSTEMINFORMATION INTEGER )"; 
        properties_array["DEPAPPROVAL"] = "CREATE TABLE DEPAPPROVAL( ID INTEGER PRIMARY KEY NOT NULL, OPTION TEXT NOT NULL )"; 
        properties_array["SYSTEMWILLPASSIF"] = "CREATE TABLE SYSTEMWILLPASSIF( ID INTEGER PRIMARY KEY NOT NULL, OPTION TEXT NOT NULL )";
        properties_array["SYSTEMWILLFAILIF"] = "CREATE TABLE SYSTEMWILLFAILIF( ID INTEGER PRIMARY KEY NOT NULL, OPTION TEXT NOT NULL )";
        properties_array["GENERALTYPEOFSYSTEM"] = "CREATE TABLE GENERALTYPEOFSYSTEM( ID INTEGER PRIMARY KEY NOT NULL, OPTION TEXT NOT NULL )";
        properties_array["BUILDINGSEWERMATERIAL"] = "CREATE TABLE BUILDINGSEWERMATERIAL( ID INTEGER PRIMARY KEY NOT NULL, OPTION TEXT NOT NULL )";
        properties_array["MATERIAL"] = "CREATE TABLE MATERIAL(ID INTEGER PRIMARY KEY NOT NULL, OPTION TEXT NOT NULL)";

  db.get("SELECT * FROM COMPANY", function(error, row) {
    if(error && error.errno === 1){
      console.log("COMPANY DOES NOT EXIST");
        db.run(properties_array["COMPANY"]);
    }
  }); 

  db.get("SELECT * FROM RESTAURANT", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["RESTAURANT"]);
    }
  });

  db.get("SELECT * FROM SEPTIC", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["SEPTIC"]);
    }
  });

  db.get("SELECT * FROM WELL", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["WELL"]);
    }
  });

  db.get("SELECT * FROM OWNER", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["OWNER"]);
    }
  });

  db.get("SELECT * FROM PROPERTY", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["PROPERTY"]);
    }
  });

  db.get("SELECT * FROM RESTAURANTINSPECTIONS", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["RESTAURANTINSPECTIONS"]);
    }
  });

  db.get("SELECT * FROM TYPEOFOPERATION", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["TYPEOFOPERATION"]);
    }
  });

  db.get("SELECT * FROM TYPEOFINSPECTION", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["TYPEOFINSPECTION"]);
    }
  });

  db.get("SELECT * FROM REASONING", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["REASONING"]);
    }
  });

  db.get("SELECT * FROM SYSTEMPUMPINGRECORD", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["SYSTEMPUMPINGRECORD"]);
    }
  });

  db.get("SELECT * FROM SEPTICPUMPINGRECORD", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["SEPTICPUMPINGRECORD"]);
    }
  });

  db.get("SELECT * FROM VIOLATIONS", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["VIOLATIONS"]);
    }
  });

  db.get("SELECT * FROM PRIVILEGES", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["PRIVILEGES"]);
    }
  });

  db.get("SELECT * FROM USER", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["USER"]);
    }
  });

  db.get("SELECT * FROM SAVEDSEARCHES", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["SAVEDSEARCHES"]);
    }
  });

  db.get("SELECT * FROM WATERQUALITYREPORT", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["WATERQUALITYREPORT"]);
    }
  });

  db.get("SELECT * FROM SEPTICINSPECTION", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["SEPTICINSPECTION"]);
    }
  });

  db.get("SELECT * FROM DEPAPPROVAL", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["DEPAPPROVAL"]);
    }
  });

  db.get("SELECT * FROM SYSTEMWILLPASSIF", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["SYSTEMWILLPASSIF"]);
    }
  });

  db.get("SELECT * FROM SYSTEMWILLFAILIF", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["SYSTEMWILLFAILIF"]);
    }
  });

  db.get("SELECT * FROM GENERALTYPEOFSYSTEM", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["GENERALTYPEOFSYSTEM"]);
    }
  });

  db.get("SELECT * FROM BUILDINGSEWERMATERIAL", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["BUILDINGSEWERMATERIAL"]);
    }
  });

  db.get("SELECT * FROM MATERIAL", function(error, row) {
    if(error && error.errno === 1){
        db.run(properties_array["MATERIAL"]);
    }
  });

});

}

