Feature: EcommerceValidations
  @Regression
  Scenario: Placing the Order
  Given a login to Ecommerce application with "saikrishnareddy@gmail.com" and "Sai@12345"
  When add a "iphone 13 pro" product to the Cart
  Then Verify iphone 13 pro is displayed in the Cart
  When Enter valid Details and Place the Order
  Then Verify the Order is present in the OrderHistory
