from wake.testing import *
from pytypes.contracts.Coupons import Coupon1155


# To launch a new development chain
@chain.connect()
# To connect to an existing chain
# @chain.connect("chain_uri")
def test_coupon():
    # Deploy contract
    coupon = Coupon1155.deploy()

    owner = chain.accounts[0]
    issuer = chain.accounts[1]
    other = chain.accounts[2]
    allowed_redeemer_1 = chain.accounts[3]
    allowed_redeemer_2 = chain.accounts[4]

    coupon.addIssuer(issuer, from_=owner)
    # Only owner can grant issuer rights
    with must_revert():  # TODO: theese things "swallow" error messages, at least to my experience
        coupon.addIssuer(other, from_=issuer)

    coupon.mint(issuer, 10, from_=issuer)
    # Only issuer can mint coupons
    with must_revert():
        coupon.mint(other, 10, from_=other)

    # Check balance
    print("Issuer balance:", coupon.balanceOf(issuer, 1))
    print("Other balance:", coupon.balanceOf(other, 1))

    print("Transfer 1: 5 coupons from issuer to other")
    coupon.safeTransferFrom(
        from__=issuer, to_=other, id=1, value_=5, data=b"", from_=issuer
    )
    print("  Issuer balance after transfer 1:", coupon.balanceOf(issuer, 1))
    print("  Other balance after transfer 1:", coupon.balanceOf(other, 1))

    print("Transfer 2: 3 coupons from issuer to allowed_redeemer_1")
    coupon.safeTransferFrom(
        from__=issuer, to_=allowed_redeemer_1, id=1, value_=3, data=b"", from_=issuer
    )
    print("  Issuer balance after transfer 2:", coupon.balanceOf(issuer, 1))
    print(
        "  Allowed_redeemer_1 balance after transfer 2:",
        coupon.balanceOf(allowed_redeemer_1, 1),
    )

    coupon.addRedeemers([allowed_redeemer_1, allowed_redeemer_2], from_=owner)

    print("Redeem 2 coupons")
    # Redeem 2 coupons
    try:
        coupon.redeem(couponID=1, amount=2, from_=other)
        print("  other redemption worked")
    except Exception as e:
        print("  redeem(other) reverted: ", e)

    try:
        coupon.redeem(couponID=1, amount=2, from_=allowed_redeemer_1)
        print("  allowed_redeemer_1 redemption worked")
    except Exception as e:
        print("  redeem(allowed_redeemer_1) reverted: ", e)

    print("Other balance after redeem:", coupon.balanceOf(other, 1))
    print(
        "allowed_redeemer_1 balance after redeem:",
        coupon.balanceOf(allowed_redeemer_1, 1),
    )
