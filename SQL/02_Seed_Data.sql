USE [NPRDashboard];
GO

set identity_insert [DonorProfile] on
insert into DonorProfile (Id, FirstName, LastName, Email, PhoneNumber, [Address], City, [State], ZipCode, NumberOfGifts) values (1, 'Tina', 'Trex', 't@t.com', '615-123-4567', '123 Kirkwood Ave', 'Nashville', 'TN', 37204, 1);
insert into DonorProfile (Id, FirstName, LastName, Email, PhoneNumber, [Address], City, [State], ZipCode, NumberOfGifts) values (2, 'Urb', 'Ultra', 'u@u.com', '345-253-4677','56 Kirkwood Ave', 'Nashville', 'TN', 37204, 2);
insert into DonorProfile (Id, FirstName, LastName, Email, PhoneNumber, [Address], City, [State], ZipCode, NumberOfGifts) values (3, 'Veronica', 'Vix', 'v@v.com', '763-237-3453', '21 Kirkwood Ave', 'Nashville', 'TN', 37204, 4);
insert into DonorProfile (Id, FirstName, LastName, Email, PhoneNumber, [Address], City, [State], ZipCode, NumberOfGifts) values (4, 'Xavior', 'Xye', 'x@x.com', '651-253-4677', '55 Kirkwood Ave', 'Nashville', 'TN', 37204, 2);
insert into DonorProfile (Id, FirstName, LastName, Email, PhoneNumber, [Address], City, [State], ZipCode, NumberOfGifts) values (5, 'Wanda', 'Walker', 'w@w.com', '612-253-4677', '65 Central Ave', 'Nashville', 'TN', 37206, 1);
insert into DonorProfile (Id, FirstName, LastName, Email, PhoneNumber, [Address], City, [State], ZipCode, NumberOfGifts) values (6, 'Yvonne', 'Yesterday', 'y@y.com', '615-891-4567', '77 Central Ave', 'Nashville', 'TN', 37206, 3);
insert into DonorProfile (Id, FirstName, LastName, Email, PhoneNumber, [Address], City, [State], ZipCode, NumberOfGifts) values (7, 'Zeb', 'Zebra', 'z@z.com', '615-253-4677', '86 Central Ave', 'Nashville', 'TN', 37206, 2);
set identity_insert [DonorProfile] off

set identity_insert [PledgeDrive] on
insert into PledgeDrive (Id, [Name], StartDate, EndDate, Goal) values (1, 'Fall 2020 Drive', '2020-09-18', '2020-09-26', 30000);
insert into PledgeDrive (Id, [Name], StartDate, EndDate, Goal) values (2, 'Holiday 2020 Drive', '2020-12-01', '2020-12-05', 30000);
insert into PledgeDrive (Id, [Name], StartDate, EndDate, Goal) values (3, 'Winter 2021 Drive', '2021-02-16', '2021-02-22', 30000);
insert into PledgeDrive (Id, [Name], StartDate, EndDate, Goal) values (4, 'Spring 2021 Drive', '2021-04-27', '2021-05-03', 30000);
insert into PledgeDrive (Id, [Name], StartDate, EndDate, Goal) values (5, 'Summer 2021 Drive', '2021-07-07', '2021-07-11', 30000);
set identity_insert [PledgeDrive] off

set identity_insert [Type] on
insert into [Type] ([Id], [Name]) 
values (1, 'Listener Contribution'), (2, 'Local Business Support'), (3, 'Grants, Events, Vehicle Donation, and Misc.'), (4, 'Corporation for Public Broadcasting')
set identity_insert [Type] off

set identity_insert [Reason] on
insert into [Reason] ([Id], [Name]) 
values (1, 'In Honor'), (2, 'In Memory'), (3, 'In Support')
set identity_insert [Reason] off

set identity_insert [Method] on
insert into [Method] ([Id], [Name]) 
values (1, 'Credit Card'), (2, 'Check'), (3, 'Gift Of Stock'), (4, 'IRA Rollover Gift'), (5, 'Vehicle Donation')
set identity_insert [Method] off

set identity_insert [Frequency] on
insert into [Frequency] ([Id], [Name]) 
values (1, 'One Time'), (2, 'Sustaining Membership')
set identity_insert [Frequency] off

set identity_insert [RecurringFrequency] on
insert into [RecurringFrequency] ([Id], [Name]) 
values (1, 'Monthly'), (2, 'Once a Quarter'), (3, 'Twice a Year')
set identity_insert [RecurringFrequency] off

set identity_insert [Gift] on
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (1, 1, 5, '2021-07-07', 15, 1, NULL, 1, 2, 1);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (2, 2, 5, '2021-07-08', 20, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (3, 2, 4, '2021-04-28', 15, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (4, 3, 5, '2021-07-09', 50, 1, NULL, 1, 2, 1);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (5, 3, 4, '2021-04-29', 45, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (6, 3, 3, '2021-02-22', 40, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (7, 3, 2, '2020-12-04', 35, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (8, 4, 5, '2021-07-11', 100, 1, NULL, 1, 2, 1);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (9, 4, 4, '2021-04-29', 50, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (10, 5, 5, '2021-07-11', 10, 1, NULL, 1, 2, 1);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (11, 6, 5, '2021-07-11', 100, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (12, 6, 4, '2021-04-28', 100, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (13, 6, 3, '2021-02-22', 100, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (14, 7, 5, '2021-07-11', 75, 1, NULL, 1, 1, NULL);
insert into [Gift] ([Id], [DonorProfileId], [PledgeDriveId], [GiftDate], [Amount], [TypeId], [ReasonId], [MethodId], [FrequencyId], [RecurringFrequencyId]) values (15, 7, 4, '2021-05-03', 100, 1, NULL, 1, 2, 1);
set identity_insert [Gift] off


