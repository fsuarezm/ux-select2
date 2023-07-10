# fsuarezm/ux-select2

## Installation

### Download using composer
Add repository url to your composer.json
```json
    "repositories": {
        "fsuarezm/ux-select2": {
            "type": "github",
            "url": "https://github.com/fsuarezm/ux-select2.git"
        }
    }
```

Require the bundle with composer:
```bash
$ composer require fsuarezm/ux-select2
```

### Enable the bundle

Enable the bundle in the kernel:

```php
// config/bundles.php
return [
    // ...
    FSM\Symfony\UX\Select2\Select2Bundle::class => ['all' => true],
];
```

### Enable Stimulus controller

Add controler to assets/controllers.json

```
    "controllers": {
        // ...
        "@fsuarezm/ux-select2": {
            "select2": {
                "enabled": true,
                "fetch": "eager",
                "autoimport": {
                    "@fsuarezm/ux-select2/src/select2-bootstrap4.css": true
                }
            }
        }
    },

```

### Assets build setting
Install dependency
```bash
$ yarn install --force
$ yarn build
or ...
$ yarn watch
```

## Usage

### Select2Type

```php
// ...
use FSM\Symfony\UX\Select2\Form\Select2Type;

class CustomFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // ...      
            ->add('select', Select2Type::class, [
                'choices'  => [
                    'Maybe' => null,
                    'Yes' => true,
                    'No' => false,
                ],
            ]);
    }

    // ...
}
```

### Select2Type with ajax query

```php
// ...
use FSM\Symfony\UX\Select2\Form\Select2Type;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class CustomFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // ...      
            ->add('select', Select2Type::class, [
                'choices'  => [],
                'autocomplete_url' => 'app_query_select2',
                    'select2_options' => [
                        'theme' => 'bootstrap4',
                ],
            ]);
            
        $getterValue = function($id) {
            // Logic for retreive [id => label] option        
        };
            
        $builder->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) use ($getterValue) {
                $data = $event->getData();
                $form = $event->getForm();
                if (isset($data['select']) and $data['select'] != null) {
                    $selected = $data['select'];

                    $form->add('select', Select2Type::class, [
                        'choices' => $getterValue($selected),
                        'autocomplete_url' => 'app_query_select2',
                        'select2_options' => [
                            'theme' => 'bootstrap4',
                        ],
                    ]);
                }
            }
        );
    }

    // ...
}

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomController extends AbstractController
{
    #[Route('/app/select2', name: 'app_query_select2', methods: ['POST'])]
    public function select2(Request $request): Response
    {
        // Get params for requestm data
        $query = $request->request->get('query');   // string to search
        $page = $request->request->get('page');     // page number
        
        // ...
    
        return $this->json([
            'results' => [
                ['id' => '1', 'text' => 'Option 1'],
                ['id' => '2', 'text' => 'Option 2'],
                ['id' => '3', 'text' => 'Option 3'],
                ['id' => '4', 'text' => 'Option 4'],
                ['id' => '5', 'text' => 'Option 5'],
            ],
            'has_next_page' => false,
        ]);
    }
}
```

### EntitySelect2Type with ajax query

```php
// ...
use Doctrine\ORM\EntityRepository;
use FSM\Symfony\UX\Select2\Form\Select2Type;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class CustomFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // ...      
            ->add('select', EntitySelect2Type::class, [
                'choices'  => [],
                'choice_label' => 'name',
                'autocomplete_url' => 'app_query_select2',
                    'select2_options' => [
                        'theme' => 'bootstrap4',
                ],
            ]);
            
        $getterValue = function($id) {
            // Logic for query and get [id => label] option        
        };
            
        $builder->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) {
                $data = $event->getData();
                $form = $event->getForm();
                if (isset($data['select']) and $data['select'] != null) {
                    $selected = $data['select'];

                    $form->add('select', EntitySelect2Type::class, [
                        'class' => EntityClass::class,
                        'choice_label' => 'name',
                        'autocomplete_url' => 'app_query_select2',
                        'select2_options' => [
                            'theme' => 'bootstrap4',
                        ],
                        'query_builder' => function (EntityRepository $repository) use ($selected) {
                            return $repository->createQueryBuilder('entity')
                                ->where('entity.id = :id')
                                ->setParameter('id', $selected);
                        },
                    ]);
                }
            }
        );
    }

    // ...
}
```