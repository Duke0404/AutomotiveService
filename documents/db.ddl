-- CUSTOMER

  CREATE TABLE "DDAS"."CUSTOMER" 
   (	"CUSTOMER_ID" NUMBER(*,0), 
	"CUSTOMER_NAME" VARCHAR2(30 CHAR), 
	"CUSTOMER_ADDRESS" VARCHAR2(50 CHAR), 
	"CUSTOMER_USERNAME" VARCHAR2(20 CHAR), 
	"CUSTOMER_PASSWORD" VARCHAR2(30 CHAR)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 ROW STORE COMPRESS ADVANCED LOGGING
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."CUSTOMER_PK" ON "DDAS"."CUSTOMER" ("CUSTOMER_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."CUSTOMER_USER" ON "DDAS"."CUSTOMER" ("CUSTOMER_USERNAME") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE OR REPLACE EDITIONABLE TRIGGER "DDAS"."CUSTOMER_TRG" 
BEFORE INSERT ON CUSTOMER 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING THEN
      SELECT CUSTOMER_SEQ.NEXTVAL INTO :NEW.CUSTOMER_ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "DDAS"."CUSTOMER_TRG" ENABLE;

  ALTER TABLE "DDAS"."CUSTOMER" ADD CONSTRAINT "CUSTOMER_PK" PRIMARY KEY ("CUSTOMER_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;
  ALTER TABLE "DDAS"."CUSTOMER" ADD CONSTRAINT "CUSTOMER_USER" UNIQUE ("CUSTOMER_USERNAME")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;
  ALTER TABLE "DDAS"."CUSTOMER" MODIFY ("CUSTOMER_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."CUSTOMER" MODIFY ("CUSTOMER_NAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."CUSTOMER" MODIFY ("CUSTOMER_USERNAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."CUSTOMER" MODIFY ("CUSTOMER_PASSWORD" NOT NULL ENABLE);

-- TEAM

  CREATE TABLE "DDAS"."TEAM" 
   (	"TEAM_ID" NUMBER(*,0), 
	"TEAM_NAME" VARCHAR2(20 CHAR), 
	"TEAM_LEADER_ID" NUMBER(*,0), 
	"PURPOSE" VARCHAR2(50 CHAR)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 ROW STORE COMPRESS ADVANCED LOGGING
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."TEAM_PK" ON "DDAS"."TEAM" ("TEAM_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  ALTER TABLE "DDAS"."TEAM" MODIFY ("TEAM_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."TEAM" MODIFY ("TEAM_NAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."TEAM" MODIFY ("TEAM_LEADER_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."TEAM" ADD CONSTRAINT "TEAM_PK" PRIMARY KEY ("TEAM_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;

-- MANUFACTURER

  CREATE TABLE "DDAS"."MANUFACTURER" 
   (	"MANUFACTURER_ID" NUMBER(*,0), 
	"MANUFACTURER_NAME" VARCHAR2(50 CHAR), 
	"MANUFACTURER_COUNTRY" VARCHAR2(50 CHAR), 
	"IN_BUSINESS" CHAR(1 BYTE)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 ROW STORE COMPRESS ADVANCED LOGGING
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."MANUFACTURER_PK" ON "DDAS"."MANUFACTURER" ("MANUFACTURER_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE OR REPLACE EDITIONABLE TRIGGER "DDAS"."MANUFACTURER_TRG" 
BEFORE INSERT ON MANUFACTURER 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING THEN
      SELECT MANUFACTURER_SEQ.NEXTVAL INTO :NEW.MANUFACTURER_ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "DDAS"."MANUFACTURER_TRG" ENABLE;

  ALTER TABLE "DDAS"."MANUFACTURER" ADD CONSTRAINT "MANUFACTURER_PK" PRIMARY KEY ("MANUFACTURER_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;
  ALTER TABLE "DDAS"."MANUFACTURER" MODIFY ("MANUFACTURER_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."MANUFACTURER" MODIFY ("MANUFACTURER_NAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."MANUFACTURER" MODIFY ("IN_BUSINESS" NOT NULL ENABLE);

-- VEHICLE_CLASS

  CREATE TABLE "DDAS"."VEHICLE_CLASS" 
   (	"TYPE_ID" NUMBER(*,0), 
	"TYPE_NAME" VARCHAR2(50 CHAR), 
	"TYPE_DESCRIPTION" VARCHAR2(100 CHAR)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 ROW STORE COMPRESS ADVANCED LOGGING
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."VEHICLE_CLASS_PK" ON "DDAS"."VEHICLE_CLASS" ("TYPE_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE OR REPLACE EDITIONABLE TRIGGER "DDAS"."VEHICLE_CLASS_TRG" 
BEFORE INSERT ON VEHICLE_CLASS 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING THEN
      SELECT VEHICLE_CLASS_SEQ.NEXTVAL INTO :NEW.TYPE_ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "DDAS"."VEHICLE_CLASS_TRG" ENABLE;

  ALTER TABLE "DDAS"."VEHICLE_CLASS" MODIFY ("TYPE_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE_CLASS" MODIFY ("TYPE_NAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE_CLASS" MODIFY ("TYPE_DESCRIPTION" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE_CLASS" ADD CONSTRAINT "VEHICLE_CLASS_PK" PRIMARY KEY ("TYPE_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;

-- EMPLOYEE

  CREATE TABLE "DDAS"."EMPLOYEE" 
   (	"EMPLOYEE_ID" NUMBER(*,0), 
	"EMPLOYEE_NAME" VARCHAR2(30 CHAR), 
	"ROLE_LEVEL" NUMBER(*,0), 
	"EMAIL" VARCHAR2(30 CHAR), 
	"PHONE" NUMBER(*,0), 
	"EMPLOYEE_USERNAME" VARCHAR2(20 CHAR), 
	"EMPLOYEE_PASSWORD" VARCHAR2(30 CHAR), 
	"TEAM_TEAM_ID" NUMBER(*,0)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 ROW STORE COMPRESS ADVANCED LOGGING
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."EMPLOYEE_USER" ON "DDAS"."EMPLOYEE" ("EMPLOYEE_USERNAME") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."EMPLOYEE_PK" ON "DDAS"."EMPLOYEE" ("EMPLOYEE_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE OR REPLACE EDITIONABLE TRIGGER "DDAS"."EMPLOYEE_TRG" 
BEFORE INSERT ON EMPLOYEE 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING THEN
      SELECT EMPLOYEE_SEQ.NEXTVAL INTO :NEW.EMPLOYEE_ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "DDAS"."EMPLOYEE_TRG" ENABLE;

  ALTER TABLE "DDAS"."EMPLOYEE" ADD CONSTRAINT "EMPLOYEE_PK" PRIMARY KEY ("EMPLOYEE_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;
  ALTER TABLE "DDAS"."EMPLOYEE" ADD CONSTRAINT "EMPLOYEE_USER" UNIQUE ("EMPLOYEE_USERNAME")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("EMPLOYEE_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("EMPLOYEE_NAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("ROLE_LEVEL" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("EMAIL" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("PHONE" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("EMPLOYEE_USERNAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("EMPLOYEE_PASSWORD" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."EMPLOYEE" MODIFY ("TEAM_TEAM_ID" NOT NULL ENABLE);

  ALTER TABLE "DDAS"."EMPLOYEE" ADD CONSTRAINT "EMPLOYEE_TEAM_FK" FOREIGN KEY ("TEAM_TEAM_ID")
	  REFERENCES "DDAS"."TEAM" ("TEAM_ID") ENABLE;

-- VEHICLE

  CREATE TABLE "DDAS"."VEHICLE" 
   (	"VEHICLE_ID" NUMBER(*,0), 
	"VEHICLE_NAME" VARCHAR2(50 CHAR), 
	"PRODUCTION_YEAR" NUMBER(4,0), 
	"VEHICLE_CLASS_TYPE_ID" NUMBER(*,0), 
	"MANUFACTURER_MANUFACTURER_ID" NUMBER(*,0)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 ROW STORE COMPRESS ADVANCED LOGGING
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."VEHICLE_PK" ON "DDAS"."VEHICLE" ("VEHICLE_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE OR REPLACE EDITIONABLE TRIGGER "DDAS"."VEHICLE_TRG" 
BEFORE INSERT ON VEHICLE 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING THEN
      SELECT VEHICLE_SEQ.NEXTVAL INTO :NEW.VEHICLE_ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "DDAS"."VEHICLE_TRG" ENABLE;

  ALTER TABLE "DDAS"."VEHICLE" MODIFY ("VEHICLE_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE" MODIFY ("VEHICLE_NAME" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE" MODIFY ("PRODUCTION_YEAR" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE" MODIFY ("VEHICLE_CLASS_TYPE_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE" MODIFY ("MANUFACTURER_MANUFACTURER_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."VEHICLE" ADD CONSTRAINT "VEHICLE_PK" PRIMARY KEY ("VEHICLE_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;

  ALTER TABLE "DDAS"."VEHICLE" ADD CONSTRAINT "VEHICLE_MANUFACTURER_FK" FOREIGN KEY ("MANUFACTURER_MANUFACTURER_ID")
	  REFERENCES "DDAS"."MANUFACTURER" ("MANUFACTURER_ID") ENABLE;
  ALTER TABLE "DDAS"."VEHICLE" ADD CONSTRAINT "VEHICLE_VEHICLE_CLASS_FK" FOREIGN KEY ("VEHICLE_CLASS_TYPE_ID")
	  REFERENCES "DDAS"."VEHICLE_CLASS" ("TYPE_ID") ENABLE;

-- ORDER_FACT

  CREATE TABLE "DDAS"."ORDER_FACT" 
   (	"ORDER_ID" NUMBER(*,0), 
	"NUMBER_PLATE" VARCHAR2(10 CHAR), 
	"ORDER_DATE" DATE, 
	"STATUS" CHAR(1 CHAR) DEFAULT 0, 
	"COMPLETION_DATE" DATE, 
	"DESCRIPTION" VARCHAR2(100 CHAR), 
	"PRICE" NUMBER(10,2), 
	"PAID" CHAR(1 CHAR) DEFAULT 0, 
	"CUSTOMER_CUSTOMER_ID" NUMBER(*,0), 
	"EMPLOYEE_EMPLOYEE_ID" NUMBER(*,0), 
	"VEHICLE_VEHICLE_ID" NUMBER(*,0)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 ROW STORE COMPRESS ADVANCED LOGGING
  TABLESPACE "II_DATA" ;

  CREATE UNIQUE INDEX "DDAS"."ORDER_PK" ON "DDAS"."ORDER_FACT" ("ORDER_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA" ;

  CREATE OR REPLACE EDITIONABLE TRIGGER "DDAS"."ORDER_FACT_TRG" 
BEFORE INSERT ON ORDER_FACT 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING THEN
      SELECT ORDER_FACT_SEQ.NEXTVAL INTO :NEW.ORDER_ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "DDAS"."ORDER_FACT_TRG" ENABLE;

  ALTER TABLE "DDAS"."ORDER_FACT" ADD CONSTRAINT "ORDER_PK" PRIMARY KEY ("ORDER_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "II_DATA"  ENABLE;
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("ORDER_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("ORDER_DATE" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("COMPLETION_DATE" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("PRICE" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("PAID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("NUMBER_PLATE" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("STATUS" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("CUSTOMER_CUSTOMER_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("EMPLOYEE_EMPLOYEE_ID" NOT NULL ENABLE);
  ALTER TABLE "DDAS"."ORDER_FACT" MODIFY ("VEHICLE_VEHICLE_ID" NOT NULL ENABLE);

  ALTER TABLE "DDAS"."ORDER_FACT" ADD CONSTRAINT "ORDER_CUSTOMER_FK" FOREIGN KEY ("CUSTOMER_CUSTOMER_ID")
	  REFERENCES "DDAS"."CUSTOMER" ("CUSTOMER_ID") ENABLE;
  ALTER TABLE "DDAS"."ORDER_FACT" ADD CONSTRAINT "ORDER_EMPLOYEE_FK" FOREIGN KEY ("EMPLOYEE_EMPLOYEE_ID")
	  REFERENCES "DDAS"."EMPLOYEE" ("EMPLOYEE_ID") ENABLE;
  ALTER TABLE "DDAS"."ORDER_FACT" ADD CONSTRAINT "ORDER_VEHICLE_FK" FOREIGN KEY ("VEHICLE_VEHICLE_ID")
	  REFERENCES "DDAS"."VEHICLE" ("VEHICLE_ID") ENABLE;