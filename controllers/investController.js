import asyncHandler from 'express-async-handler';
import ownerModel from '../models/ownerModel.js';
import mongoose from 'mongoose';
//@desc     invest
//@route    post /api/users/wallet/invest
//@access   Private

const invest = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { investAmount, shareValue } = req.body;

	let totalShare = 100000;
	const investorTotalShare = investAmount / shareValue;
	//  totalShare = 100000 - investorTotalShare
	console.log(investAmount, shareValue);
	// if(totalShare > investorTotalShare){

	const ownerShareAmount = (investAmount / 100) * 30;
	console.log('owner share amount is ', ownerShareAmount, ownerShareAmount);
	const ownerShareValue = (investorTotalShare / 100) * 30;

	const investorShareValue = investorTotalShare - ownerShareValue;
	const investorShareAmount = investAmount - ownerShareAmount;

	//   const ownerSonShare = ( investorTotalShare / 100) * 6
	//   const ownerShare = ownerTotalShare - ownerSonShare
	//  console.log(investorShare  ,ownerShare, ownerSonShare);

	const owner = await Wallet.findOne({ type: 'owner' });
	const investor = await Wallet.findById({ _id: id });

	//owner.shareValue = shareValue
	owner.shareAmount += ownerShareAmount;
	owner.totalValueShare += shareValue * ownerShareAmount;
	await owner.save();

	//investor.shareValue = shareValue
	investor.shareAmount += investorShareAmount;
	investor.totalValueShare += shareValue * investorShareAmount;
	await investor.save();

	//}
});

const verifyUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const isValidID = mongoose.Types.ObjectId.isValid(id);
	if (!isValidID) {
		res.status(430);
		throw new Error('Id not valid');
	}
	const user = ownerModel.findById(id);

	console.log('^^^^^^^^^', user);
});

export { invest, verifyUser };
