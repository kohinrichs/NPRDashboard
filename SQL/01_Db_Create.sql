USE [master]
GO

IF db_id('NPRDashboard') IS NULL
  CREATE DATABASE NPRDashboard
GO

USE [NPRDashboard]
GO

DROP TABLE IF EXISTS [DonorProfile];
DROP TABLE IF EXISTS [PledgeDrive];
DROP TABLE IF EXISTS [Gift];
DROP TABLE IF EXISTS [Type];
DROP TABLE IF EXISTS [Reason];
DROP TABLE IF EXISTS [Method];
DROP TABLE IF EXISTS [Frequency];
DROP TABLE IF EXISTS [RecurringFrequency];
GO

CREATE TABLE [DonorProfile] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [PhoneNumber] nvarchar(255) NOT NULL,
  [Address] nvarchar(255) NOT NULL,
  [City] nvarchar(255) NOT NULL,
  [State] nvarchar (5) NOT NULL,
  [ZipCode] int NOT NULL,
  [NumberOfGifts] int NOT NULL
)
GO

CREATE TABLE [PledgeDrive] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [StartDate] datetime NOT NULL,
  [EndDate] datetime NOT NULL,
  [Goal] int NOT NULL
)
GO

CREATE TABLE [Gift] (
  [Id] int PRIMARY KEY IDENTITY,
  [DonorProfileId] int NOT NULL,
  [PledgeDriveId] int NOT NULL,
  [GiftDate] datetime NOT NULL,
  [Amount] decimal NOT NULL,
  [TypeId] int NOT NULL,
  [ReasonId] int,
  [MethodId] int NOT NULL,
  [FrequencyId] int NOT NULL,
  [RecurringFrequencyId] int
)
GO

CREATE TABLE [Type] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Reason] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Method] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Frequency] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [RecurringFrequency] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Gift] ADD FOREIGN KEY ([DonorProfileId]) REFERENCES [DonorProfile] ([Id])
GO

ALTER TABLE [Gift] ADD FOREIGN KEY ([PledgeDriveId]) REFERENCES [PledgeDrive] ([Id])
GO

ALTER TABLE [Gift] ADD FOREIGN KEY ([TypeId]) REFERENCES [Type] ([Id])
GO

ALTER TABLE [Gift] ADD FOREIGN KEY ([ReasonId]) REFERENCES [Reason] ([Id])
GO

ALTER TABLE [Gift] ADD FOREIGN KEY ([FrequencyId]) REFERENCES [Frequency] ([Id])
GO

ALTER TABLE [Gift] ADD FOREIGN KEY ([RecurringFrequencyId]) REFERENCES [RecurringFrequency] ([Id])
GO

ALTER TABLE [Gift] ADD FOREIGN KEY ([methodId]) REFERENCES [Method] ([Id])
GO
