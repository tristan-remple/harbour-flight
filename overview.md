# Harbour Flight

An app that tracks when my mom can see various birds in the HRM area. Displays a dashboard based on the current month, with info about which birds are newly arrived or soon to depart. Other data includes bird species, locations seen, times active.

Data source: https://www.inaturalist.org/observations?place_id=any&taxon_id=3&user_id=darmuzz&verifiable=any&view=species

Notes:
- fields birdSeen and hours are arrays of two ints, being the first and last month or hour
- months will be stored in an array of the app
- when multiple locations with the same name occur, the same coordinate are also used, sometimes not quite accurately