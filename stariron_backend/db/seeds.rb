# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
SignObject.destroy_all
Favorite.destroy_all

user1 = User.create(name: "Test_User", birthday: "2015-12-08")

sign_object1 = SignObject.create(sign: "Tarus", content: "Leos are loving and sensitive leaders, Leos love children, are very attractive, enjoy luxury and jewelry, and have a bigger-than-life dramatic attitude, Leos are show-offs, egoistical, dominant, powerful, determined, charismatic, very demanding, athletic, smart, arrogant, pompous, conceited, temperamental, competitive, passionate, stubborn, loud, loyal, strong-willed, and usually laid-back, but can be highly aggressive or even potentially destructive, They typically want to be the center of attention and have a tremendous sense of vitality")
sign_object2 = SignObject.create(sign: "Libra", content: "Those born under the sign of Libra are intelligent, charming, flirtatious, frivolous, graceful, loyal and diplomatic, They like equality, justice, beauty, and beautiful things, They are usually considered social butterflies, polite, gracious, pleasantly mannered, idealistic, attractive, and peaceful")

favorite1 = Favorite.create(user_id: user1.id, sign_object_id: sign_object1.id)
favorite2 = Favorite.create(user_id: user1.id, sign_object_id: sign_object2.id)


puts User.all
puts SignObject.all
puts Favorite.all