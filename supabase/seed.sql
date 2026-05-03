-- Seed: 15 produits capillaires afro
INSERT INTO produits (nom, marque, categorie, types_compatibles, porosites_compatibles, ingredients, prix) VALUES

-- Soins lavants
('Curl & Shine Co-Wash', 'As I Am', 'co-wash',
  ARRAY['3A','3B','3C','4A','4B']::TEXT[], ARRAY['haute','normale']::TEXT[],
  ARRAY['cocamidopropyl betaine', 'tea tree oil', 'castor oil'], 14.90),

('Moisture Retention Shampoo', 'Cantu', 'shampoing',
  ARRAY['3A','3B','3C','4A','4B','4C']::TEXT[], ARRAY['normale','faible']::TEXT[],
  ARRAY['shea butter', 'glycerin', 'panthenol'], 11.50),

('Low-Poo Delight', 'DevaCurl', 'shampoing',
  ARRAY['3A','3B','3C']::TEXT[], ARRAY['haute','normale']::TEXT[],
  ARRAY['hyaluronic acid', 'aloe vera', 'chamomile extract'], 24.00),

-- Masques & soins profonds
('Coconut Deep Treatment Mask', 'Cantu', 'masque',
  ARRAY['3C','4A','4B','4C']::TEXT[], ARRAY['haute','normale']::TEXT[],
  ARRAY['coconut oil', 'shea butter', 'hydrolyzed wheat protein'], 9.90),

('Protein Free Deep Conditioner', 'TGIN', 'masque',
  ARRAY['4A','4B','4C']::TEXT[], ARRAY['faible','normale']::TEXT[],
  ARRAY['honey', 'olive oil', 'avocado oil'], 16.00),

('Hydration Supercharge Mask', 'Briogeo', 'masque',
  ARRAY['3A','3B','3C','4A']::TEXT[], ARRAY['haute']::TEXT[],
  ARRAY['hyaluronic acid', 'algae extract', 'quinoa protein'], 38.00),

-- Leave-ins
('Curl & Style Milk', 'Design Essentials', 'leave-in',
  ARRAY['3B','3C','4A']::TEXT[], ARRAY['normale','haute']::TEXT[],
  ARRAY['silk amino acids', 'baobab oil', 'glycerin'], 18.90),

('Leave-In Conditioner Coconut', 'As I Am', 'leave-in',
  ARRAY['3A','3B','3C','4A','4B','4C']::TEXT[], ARRAY['normale','haute']::TEXT[],
  ARRAY['coconut oil', 'vitamin e', 'panthenol'], 12.00),

('Kinky-Curly Knot Today', 'Kinky-Curly', 'leave-in',
  ARRAY['4A','4B','4C']::TEXT[], ARRAY['normale','faible']::TEXT[],
  ARRAY['slip ingredients', 'marshmallow root', 'organic agave'], 15.50),

-- Huiles & sérums
('Jamaican Black Castor Oil', 'Tropic Isle Living', 'huile',
  ARRAY['4A','4B','4C']::TEXT[], ARRAY['normale','haute','faible']::TEXT[],
  ARRAY['ricinus communis seed oil'], 13.00),

('Growth Oil Blend', 'OGX', 'huile',
  ARRAY['3C','4A','4B','4C']::TEXT[], ARRAY['normale','faible']::TEXT[],
  ARRAY['argan oil', 'castor oil', 'peppermint oil', 'rosemary extract'], 10.90),

('Jojoba & Almond Scalp Oil', 'Shea Moisture', 'huile',
  ARRAY['3A','3B','3C','4A']::TEXT[], ARRAY['normale','haute']::TEXT[],
  ARRAY['jojoba oil', 'sweet almond oil', 'peppermint'], 14.00),

-- Crèmes de coiffage
('Curl Enhancing Smoothie', 'Shea Moisture', 'creme-coiffage',
  ARRAY['3C','4A','4B','4C']::TEXT[], ARRAY['haute','normale']::TEXT[],
  ARRAY['shea butter', 'coconut oil', 'marshmallow root'], 16.50),

('Twisting Butter Curl', 'Camille Rose', 'creme-coiffage',
  ARRAY['4A','4B','4C']::TEXT[], ARRAY['normale','faible']::TEXT[],
  ARRAY['shea butter', 'mango butter', 'sweet almond oil', 'grapeseed oil'], 22.00),

('Eco Style Krystal Gel', 'Eco Styler', 'gel-coiffage',
  ARRAY['3A','3B','3C','4A']::TEXT[], ARRAY['normale','haute']::TEXT[],
  ARRAY['carbomer', 'glycerin', 'vitamin e'], 7.50);
