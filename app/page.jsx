"use client";

import styles from "../styles/home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import ContactsSection from "@/components/ContactsSection";
import PostInputBtn from "@/components/PostInputBtn";
import PostCardModal from "@/components/PostCardModal";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPostCardModalOpen, setIsPostCardModalOpen] = useState(false);

  const user = useSelector((state) => state.user.value);

  if (!user.token) {
    redirect("/login");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Enoyer dans un état pour affichage
        }
      } catch (error) {
        console.error("Error during getting posts", error);
      }
    };
    fetchPosts();
  }, []);

  const openPostCardModal = () => setIsPostCardModalOpen(true);
  const closePostCardModal = () => setIsPostCardModalOpen(false);

  return (
    <div className={styles.page}>
      <Header isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
      <div className={styles.main}>
        <SideNav />
        <Footer />
        <div className={styles.fluxContainer}>
          <div className={styles.flux}>
            <PostInputBtn onOpenPostCardModal={openPostCardModal} />
            {isPostCardModalOpen && <PostCardModal onClosePostCardModal={closePostCardModal} />}
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis quos consequuntur, earum amet quo sed ab odio, dolore culpa
              aspernatur dignissimos odit magni eaque dicta debitis cumque, in illum accusantium? Ducimus et recusandae expedita minus in
              obcaecati vero dicta voluptatem ea cupiditate nisi eligendi quidem officiis, maiores blanditiis dolorum. Molestiae, beatae?
              Eum, facere dolor itaque ad ullam aut fugiat omnis! Commodi debitis dolores porro veritatis consectetur repellendus possimus
              suscipit minus aliquam quisquam odio ad quaerat vel quam at, ex excepturi! Nostrum libero impedit eum, obcaecati sed quas
              cupiditate quia fugiat! Voluptatem repudiandae consequuntur temporibus aut aspernatur porro numquam. Magni, corporis, porro
              totam at, exercitationem odio ad quos amet nulla commodi dolorem deserunt eum corrupti illum error. Eum consequatur nobis
              maxime! Voluptatem, ipsum! Debitis recusandae quas velit optio ipsum? Laudantium corporis doloremque commodi recusandae
              repellat architecto eligendi expedita facilis ratione eos similique dolores assumenda ipsum repellendus ab, ducimus quis ex!
              Voluptatibus! Aut laborum ducimus maxime atque inventore id itaque quos dolores quibusdam ea. Eligendi sapiente atque
              dignissimos deleniti odio, quam animi! Nesciunt doloribus ea dolore laboriosam obcaecati, rem amet eos beatae. Ut ipsum rerum
              qui maiores natus minus corrupti accusamus voluptatum asperiores temporibus magni magnam laudantium, laborum velit numquam
              excepturi aliquid iusto blanditiis. Id excepturi harum minus dignissimos, eum dolores qui. Explicabo eveniet delectus ut quo
              voluptas alias assumenda fugit! Minima distinctio officia nam facilis blanditiis accusamus facere animi mollitia, quis dolorem
              molestias assumenda nemo! Quam, quibusdam libero! Quo, placeat nam? Rem ut suscipit inventore architecto unde perferendis
              deleniti repellat laudantium ex voluptatibus molestias, optio atque accusamus ipsum excepturi quos. Amet obcaecati delectus
              labore dolorem? Facere incidunt expedita accusantium dolores. Veritatis. Aperiam, nisi? Dolores eius ducimus iste? Dolorem
              voluptatem rerum voluptatum sed beatae, quis eaque praesentium fugiat cum. Beatae fugiat soluta nostrum, accusamus voluptates
              illo similique odit, doloribus obcaecati quod aliquam! Temporibus vero iste esse quas dicta ipsa id ipsum exercitationem ad
              voluptate blanditiis vel officia fuga quo reiciendis, sunt consequatur eaque distinctio consequuntur reprehenderit odit?
              Voluptates iste necessitatibus sint quia. Velit temporibus possimus aut nisi blanditiis fuga tempore ratione culpa adipisci
              quos suscipit, veniam cum laborum sapiente dolorum at dolores nostrum est incidunt nam delectus laudantium autem tenetur?
              Eius, magni! Laborum officia consectetur necessitatibus! Possimus quam similique esse aliquid consequatur. Quo nam dicta
              cumque voluptatem quibusdam inventore excepturi architecto sed rerum commodi delectus optio debitis suscipit quasi, illo
              numquam perferendis. Eum omnis consequuntur iure eos, aperiam similique necessitatibus eaque excepturi, sit quas voluptates
              reprehenderit fugiat qui ullam voluptate sed ea commodi consequatur architecto nisi accusamus ab placeat? Error, explicabo
              itaque.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere quibusdam tempora officia, explicabo impedit in dignissimos
              at aliquid beatae eveniet distinctio cupiditate fugit itaque minus adipisci modi, maiores reprehenderit sequi. Qui doloremque
              a doloribus perspiciatis porro! Cumque ea at atque nam explicabo officiis officia, nisi alias sint corporis blanditiis quo
              nesciunt sit rerum debitis repellendus minima aperiam illo a quos. At veritatis minima tempore id voluptatum veniam saepe
              blanditiis maxime deleniti, delectus reprehenderit itaque, nesciunt, a laudantium. Illo maiores aspernatur nulla natus dolor
              est voluptate porro, perferendis veniam voluptates maxime? In qui vel, voluptatum velit pariatur reprehenderit provident
              aspernatur at itaque incidunt recusandae officia nihil possimus fugiat nemo, repudiandae quidem enim sunt molestiae excepturi
              quo doloribus! Quam consequatur est nobis? Aliquid harum rerum corrupti, nam consequatur nisi explicabo sed asperiores
              voluptas alias aliquam tempora officiis voluptatum earum nihil. Excepturi eaque voluptas exercitationem iste recusandae minima
              eius numquam quod dignissimos ipsam? Illo rem eaque necessitatibus, officia quis aperiam. Voluptates asperiores facilis,
              cumque hic consequatur ipsa inventore pariatur reiciendis explicabo velit aut, natus perspiciatis debitis veniam aspernatur!
              Vitae temporibus deserunt eaque nobis. Molestiae, impedit provident? Nulla explicabo consequatur consectetur? Alias laudantium
              officia voluptate debitis, earum consequatur quis ipsa asperiores veritatis sequi quibusdam commodi atque eius, possimus, ut
              ad corrupti neque suscipit quos! Quas, blanditiis dolorem. Iure recusandae voluptas harum doloremque ab! Hic doloribus a
              officia quae non nulla illum ratione unde modi, reiciendis odit sapiente obcaecati laboriosam quas, natus vero quo totam!
              Ullam adipisci nemo alias consectetur voluptas. Expedita perferendis, culpa reprehenderit et dolorum ex quasi repellat
              incidunt in, sapiente dignissimos quidem suscipit adipisci rem neque ipsa praesentium atque exercitationem, commodi cumque.
              Rerum nobis fugit reprehenderit repellendus eos laboriosam dicta, praesentium ullam blanditiis doloribus officia nostrum velit
              est? Dicta deleniti ad quas atque, consequuntur non vel, asperiores porro sed vitae ratione! Odio! At tenetur nihil rem magnam
              quaerat, suscipit vitae non odio, enim voluptatibus molestiae iste. Corporis culpa itaque esse vitae porro vero blanditiis
              sequi non, quasi est ex necessitatibus ducimus voluptate? Soluta esse amet nesciunt quasi expedita rem hic cum accusamus ex
              eaque assumenda et quam, facilis consequuntur est blanditiis vel illum molestiae sit officia nihil deleniti? Nam assumenda
              officia saepe. Sunt fugiat deleniti cupiditate explicabo dolorum reiciendis, neque labore minus debitis aut architecto,
              distinctio repudiandae adipisci, sit asperiores. Facere dolores libero ipsa provident sit dolore adipisci? Magnam quis
              suscipit nisi! Sequi adipisci nesciunt sed aperiam aspernatur! Asperiores molestiae eaque vero, nemo aspernatur impedit qui
              rerum assumenda in voluptas cum est natus aut expedita laborum pariatur delectus, magni tempore! Nostrum, quasi. Harum culpa
              vel labore ut repellat amet id praesentium, illo quaerat, accusamus eius est voluptates nostrum dolores corporis possimus
              delectus, sit doloremque quisquam provident error. Blanditiis, distinctio itaque? Porro, similique. Molestias quaerat culpa
              rem maiores dolore nihil repudiandae ullam esse officiis atque, ipsam, aut laborum hic. Maiores quasi perferendis animi ipsa,
              facere incidunt quas labore libero alias consectetur! Laboriosam, voluptatem. At repellendus quasi deleniti sit assumenda
              sapiente corporis maxime vel eius facere nobis officiis illo dolorum, adipisci illum ipsum repudiandae incidunt? Ipsa
              consequatur, illo explicabo distinctio veniam sit! Quis, culpa. Quo numquam molestiae dicta impedit. Labore ex illo deserunt
              autem, cum incidunt dicta quae esse perferendis repudiandae dignissimos eius a ea eaque rerum quibusdam quidem? Repellat
              dolore reiciendis error ab. Enim molestiae expedita placeat consequuntur accusantium deleniti beatae corrupti doloribus quas
              adipisci quam quidem pariatur optio perspiciatis in, fuga voluptatem? Consequatur sapiente quasi, nisi fugiat nobis expedita
              harum rerum sint. Aliquam nostrum atque commodi nesciunt alias, illo iusto at ab, asperiores, cumque praesentium iste. Eveniet
              beatae dicta sequi magnam est ipsa pariatur vero vel corrupti, amet molestias delectus, nulla ducimus. Atque repellendus
              iusto, velit earum quos culpa, eveniet provident rem tempore saepe ea doloribus impedit animi, unde facere nisi labore
              reprehenderit ipsam adipisci deleniti! Numquam nobis quam magnam debitis quibusdam. Ad corrupti incidunt dolorem? Quos aperiam
              commodi temporibus autem, explicabo optio hic nostrum sapiente pariatur minus quam, natus odio velit dolorem sit veritatis
              asperiores quia non voluptas ipsam id in! Est ab possimus, laudantium reprehenderit laborum voluptatibus, obcaecati earum
              alias, iusto ea quibusdam eaque repellat nobis sint fugit natus vitae recusandae corporis accusamus! Praesentium consectetur
              accusamus commodi nam voluptatem natus! Voluptatibus aperiam nesciunt nihil voluptatem voluptatum consequatur deserunt unde
              maiores, accusantium, repellendus id voluptas ipsum. Nihil soluta, dicta optio ducimus eius vitae est inventore assumenda?
              Maiores est magni asperiores atque! Iure voluptatibus fugit laudantium, nulla placeat eos rerum maiores a nemo ad
              exercitationem non labore nesciunt vitae reiciendis pariatur blanditiis odit. Ea deleniti eos doloremque repudiandae ad
              repellendus ducimus perferendis! Odit, sunt nesciunt, distinctio odio sit quod earum libero aspernatur ullam amet quibusdam
              suscipit accusamus? Quas, ipsa laboriosam dignissimos provident ad eaque quod corporis maiores dolorem sequi asperiores odit
              voluptates? Error earum recusandae voluptatem voluptas iusto. Reiciendis dolor magnam veniam porro minima et dolorem provident
              inventore, suscipit debitis minus ipsum ipsam, atque sunt sed quas dicta, fugit dolorum sapiente molestiae! In omnis est porro
              iusto iure labore, aperiam amet officia obcaecati veritatis deleniti cum quia alias totam asperiores! Eligendi,
              exercitationem. Exercitationem repellat nostrum alias quibusdam ut tempora atque suscipit! Magnam. Rerum quia distinctio enim
              possimus eum molestiae nisi ipsam, minima architecto iusto commodi repellendus praesentium odio voluptatibus voluptas,
              doloremque nesciunt omnis sunt. Explicabo praesentium sed nemo, vel veniam architecto saepe? Amet error praesentium minima et
              adipisci laboriosam beatae inventore autem corrupti, atque aspernatur itaque quasi sapiente veritatis, cumque excepturi
              molestias a libero rerum accusamus rem voluptates deleniti voluptas. Molestiae, consequuntur. Delectus cumque quis atque
              nesciunt pariatur, eius unde quaerat enim repudiandae laboriosam natus facere neque possimus esse sunt eum quibusdam labore
              ipsam est ex, quos vel, accusamus maiores. Ipsam, consequuntur! Eum accusantium soluta quia voluptates aliquam ea iste
              dolorum? Ea assumenda eligendi fugiat quae amet illum non aspernatur inventore accusantium, repellendus alias at libero eum
              animi doloremque, delectus harum vero. Repudiandae tempore, iusto excepturi tempora veniam vel quis consectetur, corporis
              fugit dolores pariatur nisi ipsum quidem necessitatibus id vitae saepe, eos illum quod doloribus. Velit maxime accusantium
              corrupti ducimus repellendus. Nostrum saepe labore quod? Saepe, nisi ullam nobis consequatur assumenda quod velit quidem
              laudantium delectus, obcaecati, voluptatum possimus repudiandae iste incidunt! Recusandae, commodi ab eius sunt error
              accusantium quis mollitia? Minus aut voluptatum magnam doloribus molestiae autem, atque similique dolorum non repellendus
              repellat libero accusantium dolorem consequuntur corporis, at blanditiis quidem facere culpa soluta nam est a delectus. Sint,
              quia. Necessitatibus incidunt, quasi officiis sequi dolorum, voluptatum ab facilis itaque maiores, et quia id voluptatibus?
              Libero voluptatibus necessitatibus ad odio voluptas, non iste qui sint accusantium magnam doloremque molestiae nisi. Excepturi
              facilis ipsa architecto odio, praesentium blanditiis pariatur vitae. Tempora voluptate accusamus alias modi facere
              necessitatibus deserunt neque, adipisci labore aliquid voluptatibus ipsam, sint provident nobis magni at fuga error? Labore
              aspernatur recusandae ab adipisci voluptatum ipsam architecto neque nesciunt iusto consequuntur veritatis eos fugiat qui dolor
              magni, ullam, voluptas quibusdam voluptates exercitationem expedita consequatur nihil perferendis sequi asperiores. Commodi.
              Iusto, hic magni, odit officiis voluptatem error labore unde laborum placeat vel dolores porro amet reprehenderit,
              necessitatibus ab alias deleniti. Id aliquid quia dicta distinctio, deserunt quis cumque voluptate omnis. Fuga exercitationem
              hic fugit, vero autem nemo, nulla accusantium laudantium rem maiores, et totam odio vel! Recusandae, mollitia! Laudantium
              necessitatibus quibusdam repellat debitis ipsa ipsam fuga iure veritatis facere possimus! Incidunt, possimus quod accusantium
              nobis voluptatum corrupti laudantium excepturi nostrum sed obcaecati quis cum amet expedita deserunt facere numquam
              reprehenderit aut velit impedit, veniam id provident, deleniti dolore eaque! Animi. Vitae eos unde voluptatibus illum officia
              harum consectetur omnis illo labore dolorem minima consequuntur, non quia sunt, iste praesentium fugiat mollitia facere hic.
              Repellat nihil quis dolorum nesciunt accusamus rerum. Explicabo voluptatum, dolor obcaecati labore animi, reprehenderit
              ratione aliquid mollitia voluptate quidem provident, magnam officiis rem tempora porro dolores perspiciatis voluptates?
              Praesentium labore sed quam officia illo neque, impedit natus? Id at eaque, deleniti neque atque deserunt enim, tempora
              praesentium mollitia placeat soluta veritatis pariatur odio corporis exercitationem dolorem dolore! Quis consequuntur unde
              modi tempore magnam autem exercitationem quisquam esse. Soluta nobis molestias doloremque fugit voluptatibus pariatur
              consequuntur vitae nam nulla, aliquam incidunt esse? Provident ducimus repudiandae facere deserunt ad tenetur qui iusto.
              Possimus nam quidem ratione earum dolorem aspernatur. Nam aperiam aspernatur voluptatum maiores veniam repellat asperiores
              ipsum? Commodi itaque voluptates dolorem temporibus saepe iste vitae nostrum laudantium tempore, dolor repudiandae natus
              voluptas deserunt labore quisquam omnis corporis! Laboriosam! Ex, expedita pariatur officiis nostrum, dicta sequi enim ducimus
              praesentium blanditiis delectus necessitatibus cumque molestias temporibus fugiat. Veritatis est voluptate unde incidunt
              eveniet sed rerum, at ipsa fugiat fuga dolore. Nisi, error? Quos vitae molestiae laborum assumenda reprehenderit, illum
              tenetur nam? Doloribus illum dignissimos deserunt sequi quam porro assumenda harum eos, corrupti non? Quidem dolores tempore
              libero debitis. Natus, quis? Aliquam, dolorum natus! Nobis deserunt voluptatibus sequi facere qui distinctio reiciendis dolor
              ipsam expedita nulla eligendi rem earum sed cumque accusamus, non officia id doloribus laudantium? Earum quasi enim error. Rem
              iure eveniet expedita cum iste recusandae aspernatur, fugiat accusamus modi, dicta, debitis quibusdam. Mollitia excepturi
              voluptas repudiandae asperiores animi! Officiis cupiditate, delectus nesciunt ducimus necessitatibus illum nobis ad neque.
            </p>
          </div>
        </div>
        <ContactsSection isDropdownOpen={isDropdownOpen} />
      </div>
    </div>
  );
}
